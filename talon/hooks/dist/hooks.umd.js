(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('talon')) :
	typeof define === 'function' && define.amd ? define(['exports', 'talon'], factory) :
	(global = global || self, factory(global.talonHooks = {}, global.talon));
})(this, (function (exports, talon) {
	/** @type {number} */
	var currentIndex;

	/** @type {import('./internal').Component} */
	var currentComponent;

	/** @type {import('./internal').Component} */
	var previousComponent;

	/** @type {number} */
	var currentHook = 0;

	/** @type {Array<import('./internal').Component>} */
	var afterPaintEffects = [];

	// Cast to use internal Options type
	var options = /** @type {import('./internal').Options} */talon.options;
	var oldBeforeDiff = options._diff;
	var oldBeforeRender = options._render;
	var oldAfterDiff = options.diffed;
	var oldCommit = options._commit;
	var oldBeforeUnmount = options.unmount;
	var oldRoot = options._root;
	var RAF_TIMEOUT = 100;
	var prevRaf;

	/** @type {(vnode: import('./internal').VNode) => void} */
	options._diff = function (vnode) {
	  currentComponent = null;
	  if (oldBeforeDiff) oldBeforeDiff(vnode);
	};
	options._root = function (vnode, parentDom) {
	  if (vnode && parentDom._children && parentDom._children._mask) {
	    vnode._mask = parentDom._children._mask;
	  }
	  if (oldRoot) oldRoot(vnode, parentDom);
	};

	/** @type {(vnode: import('./internal').VNode) => void} */
	options._render = function (vnode) {
	  if (oldBeforeRender) oldBeforeRender(vnode);
	  currentComponent = vnode._component;
	  currentIndex = 0;
	  var hooks = currentComponent.__hooks;
	  if (hooks) {
	    if (previousComponent === currentComponent) {
	      hooks._pendingEffects = [];
	      currentComponent._renderCallbacks = [];
	      hooks._list.forEach(function (hookItem) {
	        if (hookItem._nextValue) {
	          hookItem._value = hookItem._nextValue;
	        }
	        hookItem._pendingArgs = hookItem._nextValue = undefined;
	      });
	    } else {
	      hooks._pendingEffects.forEach(invokeCleanup);
	      hooks._pendingEffects.forEach(invokeEffect);
	      hooks._pendingEffects = [];
	      currentIndex = 0;
	    }
	  }
	  previousComponent = currentComponent;
	};

	/** @type {(vnode: import('./internal').VNode) => void} */
	options.diffed = function (vnode) {
	  if (oldAfterDiff) oldAfterDiff(vnode);
	  var c = vnode._component;
	  if (c && c.__hooks) {
	    if (c.__hooks._pendingEffects.length) afterPaint(afterPaintEffects.push(c));
	    c.__hooks._list.forEach(function (hookItem) {
	      if (hookItem._pendingArgs) {
	        hookItem._args = hookItem._pendingArgs;
	      }
	      hookItem._pendingArgs = undefined;
	    });
	  }
	  previousComponent = currentComponent = null;
	};

	// TODO: Improve typing of commitQueue parameter
	/** @type {(vnode: import('./internal').VNode, commitQueue: any) => void} */
	options._commit = function (vnode, commitQueue) {
	  commitQueue.some(function (component) {
	    try {
	      component._renderCallbacks.forEach(invokeCleanup);
	      component._renderCallbacks = component._renderCallbacks.filter(function (cb) {
	        return cb._value ? invokeEffect(cb) : true;
	      });
	    } catch (e) {
	      commitQueue.some(function (c) {
	        if (c._renderCallbacks) c._renderCallbacks = [];
	      });
	      commitQueue = [];
	      options._catchError(e, component._vnode);
	    }
	  });
	  if (oldCommit) oldCommit(vnode, commitQueue);
	};

	/** @type {(vnode: import('./internal').VNode) => void} */
	options.unmount = function (vnode) {
	  if (oldBeforeUnmount) oldBeforeUnmount(vnode);
	  var c = vnode._component;
	  if (c && c.__hooks) {
	    var hasErrored;
	    c.__hooks._list.forEach(function (s) {
	      try {
	        invokeCleanup(s);
	      } catch (e) {
	        hasErrored = e;
	      }
	    });
	    c.__hooks = undefined;
	    if (hasErrored) options._catchError(hasErrored, c._vnode);
	  }
	};

	/**
	 * Get a hook's state from the currentComponent
	 * @param {number} index The index of the hook to get
	 * @param {number} type The index of the hook to get
	 * @returns {any}
	 */
	function getHookState(index, type) {
	  if (options._hook) {
	    options._hook(currentComponent, index, currentHook || type);
	  }
	  currentHook = 0;

	  // Largely inspired by:
	  // * https://github.com/michael-klein/funcy.js/blob/f6be73468e6ec46b0ff5aa3cc4c9baf72a29025a/src/hooks/core_hooks.mjs
	  // * https://github.com/michael-klein/funcy.js/blob/650beaa58c43c33a74820a3c98b3c7079cf2e333/src/renderer.mjs
	  // Other implementations to look at:
	  // * https://codesandbox.io/s/mnox05qp8
	  var hooks = currentComponent.__hooks || (currentComponent.__hooks = {
	    _list: [],
	    _pendingEffects: []
	  });
	  if (index >= hooks._list.length) {
	    hooks._list.push({});
	  }
	  return hooks._list[index];
	}

	/**
	 * @template {unknown} S
	 * @param {import('./index').Dispatch<import('./index').StateUpdater<S>>} [initialState]
	 * @returns {[S, (state: S) => void]}
	 */
	function useState(initialState) {
	  currentHook = 1;
	  return useReducer(invokeOrReturn, initialState);
	}

	/**
	 * @template {unknown} S
	 * @template {unknown} A
	 * @param {import('./index').Reducer<S, A>} reducer
	 * @param {import('./index').Dispatch<import('./index').StateUpdater<S>>} initialState
	 * @param {(initialState: any) => void} [init]
	 * @returns {[ S, (state: S) => void ]}
	 */
	function useReducer(reducer, initialState, init) {
	  /** @type {import('./internal').ReducerHookState} */
	  var hookState = getHookState(currentIndex++, 2);
	  hookState._reducer = reducer;
	  if (!hookState._component) {
	    hookState._value = [!init ? invokeOrReturn(undefined, initialState) : init(initialState), function (action) {
	      var currentValue = hookState._nextValue ? hookState._nextValue[0] : hookState._value[0];
	      var nextValue = hookState._reducer(currentValue, action);
	      if (currentValue !== nextValue) {
	        hookState._nextValue = [nextValue, hookState._value[1]];
	        hookState._component.setState({});
	      }
	    }];
	    hookState._component = currentComponent;
	    if (!currentComponent._hasScuFromHooks) {
	      // This SCU has the purpose of bailing out after repeated updates
	      // to stateful hooks.
	      // we store the next value in _nextValue[0] and keep doing that for all
	      // state setters, if we have next states and
	      // all next states within a component end up being equal to their original state
	      // we are safe to bail out for this specific component.
	      /**
	       *
	       * @type {import('./internal').Component["shouldComponentUpdate"]}
	       */
	      // @ts-ignore - We don't use TS to downtranspile
	      // eslint-disable-next-line no-inner-declarations
	      var updateHookState = function updateHookState(p, s, c) {
	        if (!hookState._component.__hooks) return true;

	        /** @type {(x: import('./internal').HookState) => x is import('./internal').ReducerHookState} */
	        var isStateHook = function isStateHook(x) {
	          return !!x._component;
	        };
	        var stateHooks = hookState._component.__hooks._list.filter(isStateHook);
	        var allHooksEmpty = stateHooks.every(function (x) {
	          return !x._nextValue;
	        });
	        // When we have no updated hooks in the component we invoke the previous SCU or
	        // traverse the VDOM tree further.
	        if (allHooksEmpty) {
	          return prevScu ? prevScu.call(this, p, s, c) : true;
	        }

	        // We check whether we have components with a nextValue set that
	        // have values that aren't equal to one another this pushes
	        // us to update further down the tree
	        var shouldUpdate = false;
	        stateHooks.forEach(function (hookItem) {
	          if (hookItem._nextValue) {
	            var currentValue = hookItem._value[0];
	            hookItem._value = hookItem._nextValue;
	            hookItem._nextValue = undefined;
	            if (currentValue !== hookItem._value[0]) shouldUpdate = true;
	          }
	        });
	        return shouldUpdate || hookState._component.props !== p ? prevScu ? prevScu.call(this, p, s, c) : true : false;
	      };
	      currentComponent._hasScuFromHooks = true;
	      var prevScu = currentComponent.shouldComponentUpdate;
	      var prevCWU = currentComponent.componentWillUpdate;

	      // If we're dealing with a forced update `shouldComponentUpdate` will
	      // not be called. But we use that to update the hook values, so we
	      // need to call it.
	      currentComponent.componentWillUpdate = function (p, s, c) {
	        if (this._force) {
	          var tmp = prevScu;
	          // Clear to avoid other sCU hooks from being called
	          prevScu = undefined;
	          updateHookState(p, s, c);
	          prevScu = tmp;
	        }
	        if (prevCWU) prevCWU.call(this, p, s, c);
	      };
	      currentComponent.shouldComponentUpdate = updateHookState;
	    }
	  }
	  return hookState._nextValue || hookState._value;
	}

	/**
	 * @param {import('./internal').Effect} callback
	 * @param {unknown[]} args
	 * @returns {void}
	 */
	function useEffect(callback, args) {
	  /** @type {import('./internal').EffectHookState} */
	  var state = getHookState(currentIndex++, 3);
	  if (!options._skipEffects && argsChanged(state._args, args)) {
	    state._value = callback;
	    state._pendingArgs = args;
	    currentComponent.__hooks._pendingEffects.push(state);
	  }
	}

	/**
	 * @param {import('./internal').Effect} callback
	 * @param {unknown[]} args
	 * @returns {void}
	 */
	function useLayoutEffect(callback, args) {
	  /** @type {import('./internal').EffectHookState} */
	  var state = getHookState(currentIndex++, 4);
	  if (!options._skipEffects && argsChanged(state._args, args)) {
	    state._value = callback;
	    state._pendingArgs = args;
	    currentComponent._renderCallbacks.push(state);
	  }
	}

	/** @type {(initialValue: unknown) => unknown} */
	function useRef(initialValue) {
	  currentHook = 5;
	  return useMemo(function () {
	    return {
	      current: initialValue
	    };
	  }, []);
	}

	/**
	 * @param {object} ref
	 * @param {() => object} createHandle
	 * @param {unknown[]} args
	 * @returns {void}
	 */
	function useImperativeHandle(ref, createHandle, args) {
	  currentHook = 6;
	  useLayoutEffect(function () {
	    if (typeof ref == 'function') {
	      ref(createHandle());
	      return function () {
	        return ref(null);
	      };
	    } else if (ref) {
	      ref.current = createHandle();
	      return function () {
	        return ref.current = null;
	      };
	    }
	  }, args == null ? args : args.concat(ref));
	}

	/**
	 * @template {unknown} T
	 * @param {() => T} factory
	 * @param {unknown[]} args
	 * @returns {T}
	 */
	function useMemo(factory, args) {
	  /** @type {import('./internal').MemoHookState<T>} */
	  var state = getHookState(currentIndex++, 7);
	  if (argsChanged(state._args, args)) {
	    state._value = factory();
	    state._args = args;
	    state._factory = factory;
	  }
	  return state._value;
	}

	/**
	 * @param {() => void} callback
	 * @param {unknown[]} args
	 * @returns {() => void}
	 */
	function useCallback(callback, args) {
	  currentHook = 8;
	  return useMemo(function () {
	    return callback;
	  }, args);
	}

	/**
	 * @param {import('./internal').TalonContext} context
	 */
	function useContext(context) {
	  var provider = currentComponent.context[context._id];
	  // We could skip this call here, but than we'd not call
	  // `options._hook`. We need to do that in order to make
	  // the devtools aware of this hook.
	  /** @type {import('./internal').ContextHookState} */
	  var state = getHookState(currentIndex++, 9);
	  // The devtools needs access to the context object to
	  // be able to pull of the default value when no provider
	  // is present in the tree.
	  state._context = context;
	  if (!provider) return context._defaultValue;
	  // This is probably not safe to convert to "!"
	  if (state._value == null) {
	    state._value = true;
	    provider.sub(currentComponent);
	  }
	  return provider.props.value;
	}

	/**
	 * Display a custom label for a custom hook for the devtools panel
	 * @type {<T>(value: T, cb?: (value: T) => string | number) => void}
	 */
	function useDebugValue(value, formatter) {
	  if (options.useDebugValue) {
	    options.useDebugValue(formatter ? formatter(value) : ( /** @type {any}*/value));
	  }
	}

	/**
	 * @param {(error: unknown, errorInfo: import('talon').ErrorInfo) => void} cb
	 * @returns {[unknown, () => void]}
	 */
	function useErrorBoundary(cb) {
	  /** @type {import('./internal').ErrorBoundaryHookState} */
	  var state = getHookState(currentIndex++, 10);
	  var errState = useState();
	  state._value = cb;
	  if (!currentComponent.componentDidCatch) {
	    currentComponent.componentDidCatch = function (err, errorInfo) {
	      if (state._value) state._value(err, errorInfo);
	      errState[1](err);
	    };
	  }
	  return [errState[0], function () {
	    errState[1](undefined);
	  }];
	}

	/** @type {() => string} */
	function useId() {
	  /** @type {import('./internal').IdHookState} */
	  var state = getHookState(currentIndex++, 11);
	  if (!state._value) {
	    // Grab either the root node or the nearest async boundary node.
	    /** @type {import('./internal.d').VNode} */
	    var root = currentComponent._vnode;
	    while (root !== null && !root._mask && root._parent !== null) {
	      root = root._parent;
	    }
	    var mask = root._mask || (root._mask = [0, 0]);
	    state._value = 'P' + mask[0] + '-' + mask[1]++;
	  }
	  return state._value;
	}

	/**
	 * After paint effects consumer.
	 */
	function flushAfterPaintEffects() {
	  var component;
	  while (component = afterPaintEffects.shift()) {
	    if (!component._parentDom || !component.__hooks) continue;
	    try {
	      component.__hooks._pendingEffects.forEach(invokeCleanup);
	      component.__hooks._pendingEffects.forEach(invokeEffect);
	      component.__hooks._pendingEffects = [];
	    } catch (e) {
	      component.__hooks._pendingEffects = [];
	      options._catchError(e, component._vnode);
	    }
	  }
	}
	var HAS_RAF = typeof requestAnimationFrame == 'function';

	/**
	 * Schedule a callback to be invoked after the browser has a chance to paint a new frame.
	 * Do this by combining requestAnimationFrame (rAF) + setTimeout to invoke a callback after
	 * the next browser frame.
	 *
	 * Also, schedule a timeout in parallel to the the rAF to ensure the callback is invoked
	 * even if RAF doesn't fire (for example if the browser tab is not visible)
	 *
	 * @param {() => void} callback
	 */
	function afterNextFrame(callback) {
	  var done = function done() {
	    clearTimeout(timeout);
	    if (HAS_RAF) cancelAnimationFrame(raf);
	    setTimeout(callback);
	  };
	  var timeout = setTimeout(done, RAF_TIMEOUT);
	  var raf;
	  if (HAS_RAF) {
	    raf = requestAnimationFrame(done);
	  }
	}

	// Note: if someone used options.debounceRendering = requestAnimationFrame,
	// then effects will ALWAYS run on the NEXT frame instead of the current one, incurring a ~16ms delay.
	// Perhaps this is not such a big deal.
	/**
	 * Schedule afterPaintEffects flush after the browser paints
	 * @param {number} newQueueLength
	 * @returns {void}
	 */
	function afterPaint(newQueueLength) {
	  if (newQueueLength === 1 || prevRaf !== options.requestAnimationFrame) {
	    prevRaf = options.requestAnimationFrame;
	    (prevRaf || afterNextFrame)(flushAfterPaintEffects);
	  }
	}

	/**
	 * @param {import('./internal').HookState} hook
	 * @returns {void}
	 */
	function invokeCleanup(hook) {
	  // A hook cleanup can introduce a call to render which creates a new root, this will call options.vnode
	  // and move the currentComponent away.
	  var comp = currentComponent;
	  var cleanup = hook._cleanup;
	  if (typeof cleanup == 'function') {
	    hook._cleanup = undefined;
	    cleanup();
	  }
	  currentComponent = comp;
	}

	/**
	 * Invoke a Hook's effect
	 * @param {import('./internal').EffectHookState} hook
	 * @returns {void}
	 */
	function invokeEffect(hook) {
	  // A hook call can introduce a call to render which creates a new root, this will call options.vnode
	  // and move the currentComponent away.
	  var comp = currentComponent;
	  hook._cleanup = hook._value();
	  currentComponent = comp;
	}

	/**
	 * @param {unknown[]} oldArgs
	 * @param {unknown[]} newArgs
	 * @returns {boolean}
	 */
	function argsChanged(oldArgs, newArgs) {
	  return !oldArgs || oldArgs.length !== newArgs.length || newArgs.some(function (arg, index) {
	    return arg !== oldArgs[index];
	  });
	}

	/**
	 * @template Arg
	 * @param {Arg} arg
	 * @param {(arg: Arg) => any} f
	 * @returns {any}
	 */
	function invokeOrReturn(arg, f) {
	  return typeof f == 'function' ? f(arg) : f;
	}

	exports.useCallback = useCallback;
	exports.useContext = useContext;
	exports.useDebugValue = useDebugValue;
	exports.useEffect = useEffect;
	exports.useErrorBoundary = useErrorBoundary;
	exports.useId = useId;
	exports.useImperativeHandle = useImperativeHandle;
	exports.useLayoutEffect = useLayoutEffect;
	exports.useMemo = useMemo;
	exports.useReducer = useReducer;
	exports.useRef = useRef;
	exports.useState = useState;

}));
//# sourceMappingURL=hooks.umd.js.map

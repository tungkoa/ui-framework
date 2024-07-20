function _construct(t, e, r) {
  if (_isNativeReflectConstruct()) return Reflect.construct.apply(null, arguments);
  var o = [null];
  o.push.apply(o, e);
  var p = new (t.bind.apply(t, o))();
  return r && _setPrototypeOf(p, r.prototype), p;
}
function _isNativeReflectConstruct() {
  try {
    var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
  } catch (t) {}
  return (_isNativeReflectConstruct = function () {
    return !!t;
  })();
}
function _toPrimitive(t, r) {
  if ("object" != typeof t || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r || "default");
    if ("object" != typeof i) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
function _toPropertyKey(t) {
  var i = _toPrimitive(t, "string");
  return "symbol" == typeof i ? i : String(i);
}
function _wrapRegExp() {
  _wrapRegExp = function (e, r) {
    return new BabelRegExp(e, void 0, r);
  };
  var e = RegExp.prototype,
    r = new WeakMap();
  function BabelRegExp(e, t, p) {
    var o = new RegExp(e, t);
    return r.set(o, p || r.get(e)), _setPrototypeOf(o, BabelRegExp.prototype);
  }
  function buildGroups(e, t) {
    var p = r.get(t);
    return Object.keys(p).reduce(function (r, t) {
      var o = p[t];
      if ("number" == typeof o) r[t] = e[o];else {
        for (var i = 0; void 0 === e[o[i]] && i + 1 < o.length;) i++;
        r[t] = e[o[i]];
      }
      return r;
    }, Object.create(null));
  }
  return _inherits(BabelRegExp, RegExp), BabelRegExp.prototype.exec = function (r) {
    var t = e.exec.call(this, r);
    if (t) {
      t.groups = buildGroups(t, this);
      var p = t.indices;
      p && (p.groups = buildGroups(p, this));
    }
    return t;
  }, BabelRegExp.prototype[Symbol.replace] = function (t, p) {
    if ("string" == typeof p) {
      var o = r.get(this);
      return e[Symbol.replace].call(this, t, p.replace(/\$<([^>]+)>/g, function (e, r) {
        var t = o[r];
        return "$" + (Array.isArray(t) ? t.join("$") : t);
      }));
    }
    if ("function" == typeof p) {
      var i = this;
      return e[Symbol.replace].call(this, t, function () {
        var e = arguments;
        return "object" != typeof e[e.length - 1] && (e = [].slice.call(e)).push(buildGroups(e, i)), p.apply(this, e);
      });
    }
    return e[Symbol.replace].call(this, t, p);
  }, _wrapRegExp.apply(this, arguments);
}
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}
function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends.apply(this, arguments);
}
function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  Object.defineProperty(subClass, "prototype", {
    writable: false
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}
function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  _setPrototypeOf(subClass, superClass);
}
function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}
function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };
  return _setPrototypeOf(o, p);
}
function _isNativeFunction(fn) {
  try {
    return Function.toString.call(fn).indexOf("[native code]") !== -1;
  } catch (e) {
    return typeof fn === "function";
  }
}
function _wrapNativeSuper(Class) {
  var _cache = typeof Map === "function" ? new Map() : undefined;
  _wrapNativeSuper = function _wrapNativeSuper(Class) {
    if (Class === null || !_isNativeFunction(Class)) return Class;
    if (typeof Class !== "function") {
      throw new TypeError("Super expression must either be null or a function");
    }
    if (typeof _cache !== "undefined") {
      if (_cache.has(Class)) return _cache.get(Class);
      _cache.set(Class, Wrapper);
    }
    function Wrapper() {
      return _construct(Class, arguments, _getPrototypeOf(this).constructor);
    }
    Wrapper.prototype = Object.create(Class.prototype, {
      constructor: {
        value: Wrapper,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    return _setPrototypeOf(Wrapper, Class);
  };
  return _wrapNativeSuper(Class);
}
function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;
  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }
  return target;
}
function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}
function _createForOfIteratorHelperLoose(o, allowArrayLike) {
  var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
  if (it) return (it = it.call(o)).next.bind(it);
  if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
    if (it) o = it;
    var i = 0;
    return function () {
      if (i >= o.length) return {
        done: true
      };
      return {
        done: false,
        value: o[i++]
      };
    };
  }
  throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

var isSSR = function isSSR() {
  return typeof _nano !== "undefined" && _nano.isSSR === true;
};
/** Creates a new Microtask using Promise() */
var tick = Promise.prototype.then.bind(Promise.resolve());
var removeAllChildNodes = function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
};
// https://stackoverflow.com/a/7616484/12656855
var strToHash = function strToHash(s) {
  var hash = 0;
  for (var i = 0; i < s.length; i++) {
    var chr = s.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return Math.abs(hash).toString(32);
};
var appendChildren = function appendChildren(element, children, escape) {
  // if the child is an html element
  if (!Array.isArray(children)) {
    appendChildren(element, [children]);
    return;
  }
  // htmlCollection to array
  if (typeof children === "object") children = Array.prototype.slice.call(children);
  children.forEach(function (child) {
    // if child is an array of children, append them instead
    if (Array.isArray(child)) appendChildren(element, child);else {
      // render the component
      var c = _render(child);
      if (typeof c !== "undefined") {
        // if c is an array of children, append them instead
        if (Array.isArray(c)) appendChildren(element, c);
        // apply the component to parent element
        else {
          element.appendChild(c.nodeType == null ? document.createTextNode(c.toString()) : c);
        }
      }
    }
  });
};
/**
 * A simple component for rendering SVGs
 */
var SVG = function SVG(props) {
  var child = props.children[0];
  var attrs = child.attributes;
  if (isSSR()) return child;
  var svg = hNS("svg");
  for (var i = attrs.length - 1; i >= 0; i--) {
    svg.setAttribute(attrs[i].name, attrs[i].value);
  }
  svg.innerHTML = child.innerHTML;
  return svg;
};
/** Returns the populated parent if available else  one child or an array of children */
var render = function render(component, parent, removeChildNodes) {
  if (parent === void 0) {
    parent = null;
  }
  if (removeChildNodes === void 0) {
    removeChildNodes = true;
  }
  console.log("component", component);
  var el = _render(component);
  console.log("el", el);
  if (Array.isArray(el)) {
    el = el.map(function (e) {
      return _render(e);
    });
    if (el.length === 1) el = el[0];
  }
  if (parent) {
    if (removeChildNodes) removeAllChildNodes(parent);
    // if parent and child are the same, we replace the parent instead of appending to it
    if (el && parent.id && parent.id === el.id && parent.parentElement) {
      parent.parentElement.replaceChild(el, parent);
    } else {
      // append element(s) to the parent
      if (Array.isArray(el)) el.forEach(function (e) {
        appendChildren(parent, _render(e));
        //parent.appendChild(_render(e))
      });else appendChildren(parent, _render(el));
    }
    return parent;
  }
  // returning one child or an array of children
  else {
    if (isSSR() && !Array.isArray(el)) return [el];
    return el;
  }
};
var hydrate = render;
var _render = function _render(comp) {
  console.log("comp", comp);
  // null, false, undefined
  if (comp === null || comp === false || typeof comp === "undefined") return [];
  // string, number
  if (typeof comp === "string" || typeof comp === "number") return comp.toString();
  // SVGElement
  if (comp.tagName && comp.tagName.toLowerCase() === "svg") return SVG({
    children: [comp]
  });
  // HTMLElement
  if (comp.tagName) return comp;
  // TEXTNode (Node.TEXT_NODE === 3)
  if (comp && comp.nodeType === 3) return comp;
  // Class Component
  if (comp && comp.component && comp.component.isClass) return renderClassComponent(comp);
  // Class Component (Uninitialized)
  if (comp.isClass) return renderClassComponent({
    component: comp,
    props: {}
  });
  // Functional Component
  if (comp.component && typeof comp.component === "function") return renderFunctionalComponent(comp);
  // Array (render each child and return the array) (is probably a fragment)
  if (Array.isArray(comp)) return comp.map(function (c) {
    return _render(c);
  }).flat();
  // function
  if (typeof comp === "function" && !comp.isClass) return _render(comp());
  // if component is a HTMLElement (rare case)
  if (comp.component && comp.component.tagName && typeof comp.component.tagName === "string") return _render(comp.component);
  // (rare case)
  if (Array.isArray(comp.component)) return _render(comp.component);
  // (rare case)
  if (comp.component) return _render(comp.component);
  // object
  if (typeof comp === "object") return [];
  console.warn("Something unexpected happened with:", comp);
};
var renderFunctionalComponent = function renderFunctionalComponent(fncComp) {
  var component = fncComp.component,
    props = fncComp.props;
  console.log("func", component(props));
  return _render(component(props));
};
var renderClassComponent = function renderClassComponent(classComp) {
  var component = classComp.component,
    props = classComp.props;
  // calc hash
  var hash = strToHash(component.toString());
  // make hash accessible in constructor, without passing it to it
  component.prototype._getHash = function () {
    return hash;
  };
  var Component = new component(props);
  if (!isSSR()) Component.willMount();
  var el = Component.render();
  el = _render(el);
  Component.elements = el;
  // pass the component instance as ref
  if (props && props.ref) props.ref(Component);
  if (!isSSR()) tick(function () {
    Component._didMount();
  });
  return el;
};
var hNS = function hNS(tag) {
  return document.createElementNS("http://www.w3.org/2000/svg", tag);
};
// https://stackoverflow.com/a/42405694/12656855
var h = function h(tagNameOrComponent, props) {
  if (props === void 0) {
    props = {};
  }
  var children = [].slice.call(arguments, 2);
  console.log("tagNameOrComponent", tagNameOrComponent);
  // if children is passed as props, merge with ...children
  if (props && props.children) {
    if (Array.isArray(children)) {
      if (Array.isArray(props.children)) children = [].concat(props.children, children);else children.push(props.children);
    } else {
      if (Array.isArray(props.children)) children = props.children;else children = [props.children];
    }
  }
  // if tagNameOrComponent is a component
  if (typeof tagNameOrComponent !== "string") return {
    component: tagNameOrComponent,
    props: _extends({}, props, {
      children: children
    })
  };
  var ref;
  var element = document.createElement(tagNameOrComponent);
  // check if the element includes the event (for example 'oninput')
  var isEvent = function isEvent(el, p) {
    // check if the event begins with 'on'
    if (0 !== p.indexOf("on")) return false;
    // we return true if SSR, since otherwise it will get rendered
    if (el._ssr) return true;
    // check if the event is present in the element as object (null) or as function
    return typeof el[p] === "object" || typeof el[p] === "function";
  };
  var _loop = function _loop(p) {
    // https://stackoverflow.com/a/45205645/12656855
    // style object to style string
    if (p === "style" && typeof props[p] === "object") {
      var styles = Object.keys(props[p]).map(function (k) {
        return k + ":" + props[p][k];
      }).join(";").replace(/[A-Z]/g, function (match) {
        return "-" + match.toLowerCase();
      });
      props[p] = styles + ";";
    }
    // handel ref
    if (p === "ref") ref = props[p];
    // handle events
    else if (isEvent(element, p.toLowerCase())) element.addEventListener(p.toLowerCase().substring(2), function (e) {
      return props[p](e);
    });
    // dangerouslySetInnerHTML
    else if (p === "dangerouslySetInnerHTML" && props[p].__html) {
      if (!isSSR()) {
        var fragment = document.createElement("fragment");
        fragment.innerHTML = props[p].__html;
        element.appendChild(fragment);
      } else {
        element.innerHTML = props[p].__html;
      }
    }
    // modern dangerouslySetInnerHTML
    else if (p === "innerHTML" && props[p].__dangerousHtml) {
      if (!isSSR()) {
        var _fragment = document.createElement("fragment");
        _fragment.innerHTML = props[p].__dangerousHtml;
        element.appendChild(_fragment);
      } else {
        element.innerHTML = props[p].__dangerousHtml;
      }
    }
    // className
    else if (/^className$/i.test(p)) element.setAttribute("class", props[p]);
    // setAttribute
    else if (typeof props[p] !== "undefined") element.setAttribute(p, props[p]);
  };
  for (var p in props) {
    _loop(p);
  }
  appendChildren(element, children);
  if (ref) ref(element);
  return element;
};

// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.
var VERSION = '0.1.0';

/** Creates a new Task using setTimeout() */
var task = function task(_task) {
  return setTimeout(_task, 0);
};
var nodeToString = function nodeToString(node) {
  var tmpNode = document.createElement('div');
  tmpNode.appendChild(node.cloneNode(true));
  return tmpNode.innerHTML;
};
var detectSSR = function detectSSR() {
  // @ts-ignore
  var isDeno = typeof Deno !== 'undefined';
  var hasWindow = typeof window !== 'undefined' ? true : false;
  return typeof _nano !== 'undefined' && _nano.isSSR || isDeno || !hasWindow;
};
function isDescendant(desc, root) {
  // @ts-ignore
  return !!desc && (desc === root || isDescendant(desc.parentNode, root));
}
// https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver
var onNodeRemove = function onNodeRemove(element, callback) {
  var observer = new MutationObserver(function (mutationsList) {
    mutationsList.forEach(function (mutation) {
      mutation.removedNodes.forEach(function (removed) {
        if (isDescendant(element, removed)) {
          callback();
          if (observer) {
            // allow garbage collection
            observer.disconnect();
            // @ts-ignore
            observer = undefined;
          }
        }
      });
    });
  });
  observer.observe(document, {
    childList: true,
    subtree: true
  });
  return observer;
};
// https://stackoverflow.com/a/6234804
var escapeHtml = function escapeHtml(unsafe) {
  if (unsafe && typeof unsafe === 'string') return unsafe.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');
  return unsafe;
};
var printVersion = function printVersion() {
  var info = "Powered by nano JSX v" + VERSION;
  console.log("%c %c %c %c %c " + info + " %c http://nanojsx.io", 'background: #ff0000', 'background: #ffff00', 'background: #00ff00', 'background: #00ffff', 'color: #fff; background: #000000;', 'background: none');
};

/** Holds the state of the whole application. */
var _state = new Map();

var Component = /*#__PURE__*/function () {
  function Component(props) {
    this.props = void 0;
    this.id = void 0;
    this._elements = [];
    this._skipUnmount = false;
    this._hasUnmounted = false;
    this.props = props || {};
    this.id = this._getHash();
  }
  var _proto = Component.prototype;
  _proto.setState = function setState(state, shouldUpdate) {
    if (shouldUpdate === void 0) {
      shouldUpdate = false;
    }
    var isObject = typeof state === 'object' && state !== null;
    // if state is an object, we merge the objects
    if (isObject && this.state !== undefined) this.state = _extends({}, this.state, state);
    // else, we just overwrite it
    else this.state = state;
    if (shouldUpdate) this.update();
  };
  _proto._addNodeRemoveListener = function _addNodeRemoveListener() {
    var _this = this;
    // check if didUnmount is unused
    if (/^[^{]+{\s+}$/gm.test(this.didUnmount.toString())) return;
    // listen if the root elements gets removed
    onNodeRemove(this.elements[0], function () {
      if (!_this._skipUnmount) _this._didUnmount();
    });
  }
  // @ts-ignore
  ;
  _proto._didMount = function _didMount() {
    this._addNodeRemoveListener();
    this.didMount();
  };
  _proto._willUpdate = function _willUpdate() {
    this.willUpdate();
  };
  _proto._didUpdate = function _didUpdate() {
    this.didUpdate();
  };
  _proto._didUnmount = function _didUnmount() {
    if (this._hasUnmounted) return;
    this.didUnmount();
    this._hasUnmounted = true;
  };
  _proto.willMount = function willMount() {};
  _proto.didMount = function didMount() {};
  _proto.willUpdate = function willUpdate() {};
  _proto.didUpdate = function didUpdate() {};
  _proto.didUnmount = function didUnmount() {};
  _proto.render = function render(_update) {}
  /** Will forceRender the component */;
  _proto.update = function update(_update2) {
    var _this2 = this;
    this._skipUnmount = true;
    this._willUpdate();
    // get all current rendered node elements
    var oldElements = [].concat(this.elements);
    // clear
    this._elements = [];
    var el = this.render(_update2);
    el = _render(el);
    this.elements = el;
    // console.log('old: ', oldElements)
    // console.log('new: ', this.elements)
    // get valid parent node
    var parent = oldElements[0].parentElement;
    // make sure we have a parent
    if (!parent) console.warn('Component needs a parent element to get updated!');
    // add all new node elements
    this.elements.forEach(function (child) {
      if (parent) parent.insertBefore(child, oldElements[0]);
    });
    // remove all elements
    oldElements.forEach(function (child) {
      // wee keep the element if it is the same, for example if passed as a child
      if (!_this2.elements.includes(child)) {
        child.remove();
        // @ts-ignore
        child = null;
      }
    });
    // listen for node removal
    this._addNodeRemoveListener();
    // @ts-ignore
    tick(function () {
      _this2._skipUnmount = false;
      if (!_this2.elements[0].isConnected) _this2._didUnmount();else _this2._didUpdate();
    });
  };
  _proto._getHash = function _getHash() {};
  return _createClass(Component, [{
    key: "isClass",
    get: function get() {
      return true;
    }
  }, {
    key: "state",
    get: function get() {
      return _state.get(this.id);
    },
    set: function set(state) {
      _state.set(this.id, state);
    }
  }, {
    key: "initState",
    set: function set(state) {
      if (this.state === undefined) this.state = state;
    }
    /** Returns all currently rendered node elements */
  }, {
    key: "elements",
    get: function get() {
      return this._elements || [];
    },
    set: function set(elements) {
      var _this3 = this;
      if (!Array.isArray(elements)) elements = [elements];
      elements.forEach(function (element) {
        _this3._elements.push(element);
      });
    }
  }], [{
    key: "isClass",
    get: function get() {
      return true;
    }
  }]);
}();

var Attributes = /*#__PURE__*/function (_Map) {
  function Attributes() {
    return _Map.apply(this, arguments) || this;
  }
  _inheritsLoose(Attributes, _Map);
  var _proto = Attributes.prototype;
  _proto.toString = function toString() {
    var string = '';
    for (var _iterator = _createForOfIteratorHelperLoose(this), _step; !(_step = _iterator()).done;) {
      var _step$value = _step.value,
        key = _step$value[0],
        value = _step$value[1];
      string += " " + key + "=\"" + value + "\"";
    }
    return string.trim();
  };
  return Attributes;
}( /*#__PURE__*/_wrapNativeSuper(Map));
var Helmet = /*#__PURE__*/function (_Component) {
  function Helmet() {
    return _Component.apply(this, arguments) || this;
  }
  _inheritsLoose(Helmet, _Component);
  Helmet.SSR = function SSR(body) {
    var reg = /(<helmet\b[^>]*>)((.|\r|\n)*?)(<\/helmet>)/gm;
    // collect all elements
    var head = [];
    var footer = [];
    var attributes = {
      html: new Attributes(),
      body: new Attributes()
    };
    // get what's in the head
    if (typeof document !== 'undefined' && document.head) {
      var children = [];
      children = [].slice.call(document.head.children);
      for (var i = 0; i < children.length; i++) {
        // check if the same element already exists
        if (head.indexOf(children[i]) === -1) {
          head.push(children[i]);
        }
      }
    }
    var result;
    var _loop = function _loop() {
      var _body$match, _body$match2;
      var first = result[1];
      var second = result[2];
      var regHTML = /<html\s([^>]+)><\/html>/gm;
      var regBody = /<body\s([^>]+)><\/body>/gm;
      var regAttr = /(\w+)="([^"]+)"/gm;
      var res = null;
      // extract html attributes
      (_body$match = body.match(regHTML)) == null || _body$match.forEach(function (h) {
        second = second.replace(h, '');
        while ((res = regAttr.exec(h)) !== null) {
          attributes.html.set(res[1], res[2]);
        }
      });
      // extract body attributes
      (_body$match2 = body.match(regBody)) == null || _body$match2.forEach(function (b) {
        second = second.replace(b, '');
        while ((res = regAttr.exec(b)) !== null) {
          attributes.body.set(res[1], res[2]);
        }
      });
      var toHead = first.includes('data-placement="head"');
      // do not add an element if it already exists
      if (toHead && !head.includes(second)) head.push(second);else if (!toHead && !footer.includes(second)) footer.push(second);
    };
    while ((result = reg.exec(body)) !== null) {
      _loop();
    }
    // clean the body from all matches
    var cleanBody = body.replace(reg, '');
    return {
      body: cleanBody,
      head: head,
      footer: footer,
      attributes: attributes
    };
  };
  var _proto2 = Helmet.prototype;
  _proto2.didMount = function didMount() {
    var _this = this;
    this.props.children.forEach(function (element) {
      // return if it is not an html element
      if (!(element instanceof HTMLElement)) return;
      var parent = _this.props.footer ? document.body : document.head;
      var tag = element.tagName;
      var attrs = [];
      // get the inner text
      attrs.push(element.innerText);
      // get all attributes
      for (var attr = 0; attr < element.attributes.length; attr++) {
        var _element$attributes$i, _element$attributes$i2;
        attrs.push((_element$attributes$i = element.attributes.item(attr)) == null ? void 0 : _element$attributes$i.name.toLowerCase());
        attrs.push((_element$attributes$i2 = element.attributes.item(attr)) == null ? void 0 : _element$attributes$i2.value.toLowerCase());
      }
      // handle special tags
      if (tag === 'HTML' || tag === 'BODY') {
        var htmlTag = document.getElementsByTagName(tag)[0];
        for (var _attr = 1; _attr < attrs.length; _attr += 2) {
          htmlTag.setAttribute(attrs[_attr], attrs[_attr + 1]);
        }
        return;
      } else if (tag === 'TITLE') {
        var titleTags = document.getElementsByTagName('TITLE');
        if (titleTags.length > 0) {
          var e = element;
          titleTags[0].text = e.text;
        } else {
          var titleTag = h('title', null, element.innerHTML);
          appendChildren(parent, [titleTag]);
        }
        return;
      }
      // check if the element already exists
      var exists = false;
      attrs = attrs.sort();
      var el = document.getElementsByTagName(tag);
      for (var i = 0; i < el.length; i++) {
        var attrs2 = [];
        // get the inner text
        attrs2.push(el[i].innerText);
        for (var _attr2 = 0; _attr2 < el[i].attributes.length; _attr2++) {
          var _el$i$attributes$item, _el$i$attributes$item2;
          attrs2.push((_el$i$attributes$item = el[i].attributes.item(_attr2)) == null ? void 0 : _el$i$attributes$item.name.toLowerCase());
          attrs2.push((_el$i$attributes$item2 = el[i].attributes.item(_attr2)) == null ? void 0 : _el$i$attributes$item2.value.toLowerCase());
        }
        attrs2 = attrs2.sort();
        if (attrs.length > 0 && attrs2.length > 0 && JSON.stringify(attrs) === JSON.stringify(attrs2)) exists = true;
      }
      // add to dom
      if (!exists) appendChildren(parent, [element]);
    });
  };
  _proto2.render = function render() {
    var placement = this.props.footer ? 'footer' : 'head';
    if (isSSR()) return h('helmet', {
      'data-ssr': true,
      'data-placement': placement
    }, this.props.children);else return [];
  };
  return Helmet;
}(Component);

var _excluded$4 = ["lazy", "placeholder", "children", "key", "ref"],
  _excluded2$1 = ["src", "placeholder", "children", "lazy", "key", "ref"],
  _excluded3$1 = ["width", "height"];
/**
 * A useful Image component
 * Add <Img lazy ..., to lazy load the img source
 * Add <Img width="100" height="100" ..., to specify img element's size.
 * Add <Img placeholder="src or element" ...., to prepare placeholder for img.
 */
var Img = /*#__PURE__*/function (_Component) {
  function Img(props) {
    var _this;
    _this = _Component.call(this, props) || this;
    var src = props.src,
      key = props.key;
    // id has to be unique
    _this.id = strToHash(src) + "-" + strToHash(JSON.stringify(props));
    if (key) _this.id += "key-" + key;
    // this could also be done in willMount()
    if (!_this.state) _this.setState({
      isLoaded: false,
      image: undefined
    });
    return _this;
  }
  _inheritsLoose(Img, _Component);
  var _proto = Img.prototype;
  _proto.didMount = function didMount() {
    var _this2 = this;
    var _this$props = this.props,
      _this$props$lazy = _this$props.lazy,
      lazy = _this$props$lazy === void 0 ? true : _this$props$lazy,
      rest = _objectWithoutPropertiesLoose(_this$props, _excluded$4);
    if (typeof lazy === 'boolean' && lazy === false) return;
    var observer = new IntersectionObserver(function (entries, observer) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          observer.disconnect();
          _this2.state.image = h('img', _extends({}, rest));
          if (_this2.state.image.complete) {
            _this2.state.isLoaded = true;
            _this2.update();
          } else {
            _this2.state.image.onload = function () {
              _this2.state.isLoaded = true;
              _this2.update();
            };
          }
        }
      });
    }, {
      threshold: [0, 1]
    });
    observer.observe(this.elements[0]);
  };
  _proto.render = function render() {
    var _this$props2 = this.props,
      src = _this$props2.src,
      placeholder = _this$props2.placeholder,
      _this$props2$lazy = _this$props2.lazy,
      lazy = _this$props2$lazy === void 0 ? true : _this$props2$lazy,
      rest = _objectWithoutPropertiesLoose(_this$props2, _excluded2$1);
    // return the img tag if not lazy loaded
    if (typeof lazy === 'boolean' && lazy === false) {
      this.state.image = h('img', _extends({
        src: src
      }, rest));
      return this.state.image;
    }
    // if it is visible and loaded, show the image
    if (this.state.isLoaded) {
      return this.state.image;
      // if the placeholder is an image src
    } else if (placeholder && typeof placeholder === 'string') {
      return h('img', _extends({
        src: placeholder
      }, rest));
      // if the placeholder is an JSX element
    } else if (placeholder && typeof placeholder === 'function') {
      return placeholder();
    } else {
      // render a simple box
      var style = {};
      if (rest.width) style.width = rest.width + "px";
      if (rest.height) style.height = rest.height + "px";
      var others = _objectWithoutPropertiesLoose(rest, _excluded3$1);
      return h('div', _extends({
        style: style
      }, others));
    }
  };
  return Img;
}(Component);

var Fragment = function Fragment(props) {
  return props.children;
};

var _excluded$3 = ["children", "prefetch", "back", "ref"];
/**
 * A simple Link component
 * Add <Link prefetch ..., to prefetch the html document
 * Add <Link prefetch="hover" ..., to prefetch the html document on hovering over the link element.
 */
var Link$1 = /*#__PURE__*/function (_Component) {
  function Link() {
    return _Component.apply(this, arguments) || this;
  }
  _inheritsLoose(Link, _Component);
  var _proto = Link.prototype;
  _proto.prefetchOnHover = function prefetchOnHover() {
    var _this = this;
    this.elements[0].addEventListener('mouseover', function () {
      return _this.addPrefetch();
    }, {
      once: true
    });
  };
  _proto.prefetchOnVisible = function prefetchOnVisible() {
    var _this2 = this;
    var observer = new IntersectionObserver(function (entries, observer) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          observer.disconnect();
          _this2.addPrefetch();
        }
      });
    }, {
      threshold: [0, 1]
    });
    observer.observe(this.elements[0]);
  };
  _proto.addPrefetch = function addPrefetch() {
    var doesAlreadyExist = false;
    // check if it is already on the dom
    var links = document.getElementsByTagName('link');
    for (var i = 0; i < links.length; i++) {
      // if it is not already on the dom, add it
      if (links[i].getAttribute('rel') === 'prefetch' && links[i].getAttribute('href') === this.props.href) {
        doesAlreadyExist = true;
      }
    }
    if (!doesAlreadyExist) {
      var prefetch = h('link', {
        rel: 'prefetch',
        href: this.props.href,
        as: 'document'
      });
      document.head.appendChild(prefetch);
    }
  };
  _proto.didMount = function didMount() {
    var _this$props = this.props,
      href = _this$props.href,
      prefetch = _this$props.prefetch,
      _this$props$delay = _this$props.delay,
      delay = _this$props$delay === void 0 ? 0 : _this$props$delay,
      _this$props$back = _this$props.back,
      back = _this$props$back === void 0 ? false : _this$props$back;
    if (back) this.elements[0].addEventListener('click', function (e) {
      e.preventDefault();
      var target = e.target;
      if (target.href === document.referrer) window.history.back();else window.location.href = target.href;
    });
    if (delay > 0) this.elements[0].addEventListener('click', function (e) {
      e.preventDefault();
      setTimeout(function () {
        return window.location.href = href;
      }, delay);
    });
    if (prefetch) {
      if (prefetch === 'hover') this.prefetchOnHover();else if (prefetch === 'visible') this.prefetchOnVisible();else this.addPrefetch();
    }
  };
  _proto.render = function render() {
    // separate children and prefetch from props
    var _this$props2 = this.props,
      children = _this$props2.children,
      prefetch = _this$props2.prefetch,
      rest = _objectWithoutPropertiesLoose(_this$props2, _excluded$3);
    // some warning messages
    if (!this.props.href) console.warn('Please add "href" to <Link>');
    if (children.length !== 1) console.warn('Please add ONE child to <Link> (<Link>child</Link>)');
    var a = h.apply(void 0, ['a', _extends({}, rest)].concat(children));
    // if ssr
    if (prefetch === true && !(typeof window !== 'undefined' && window.document)) {
      // <link rel="prefetch" href="/index.html" as="document"></link>
      var link = h('link', {
        rel: 'prefetch',
        href: this.props.href,
        as: 'document'
      });
      var helmet = h(Helmet, null, link);
      return h(Fragment, null, [helmet, a]);
    }
    // if not ssr
    else {
      return a;
    }
  };
  return Link;
}(Component);

var _excluded$2 = ["to", "replace", "children"];
var instances = [];
var register = function register(comp) {
  return instances.push(comp);
};
var unregister = function unregister(comp) {
  return instances.splice(instances.indexOf(comp), 1);
};
var historyPush = function historyPush(path) {
  window.history.pushState({}, '', path);
  instances.forEach(function (instance) {
    return instance.handleChanges();
  });
  window.dispatchEvent(new Event('pushstate'));
};
var historyReplace = function historyReplace(path) {
  window.history.replaceState({}, '', path);
  instances.forEach(function (instance) {
    return instance.handleChanges();
  });
  window.dispatchEvent(new Event('replacestate'));
};
var matchPath = function matchPath(pathname, options) {
  var _options$exact = options.exact,
    exact = _options$exact === void 0 ? false : _options$exact,
    regex = options.regex;
  var path = options.path;
  if (!path) {
    return {
      path: null,
      url: pathname,
      isExact: true,
      params: {}
    };
  }
  var match;
  var params = {};
  // path with params
  if (path.includes('/:')) {
    var pathArr = path.split('/');
    var pathnameArr = pathname.split('/');
    pathArr.forEach(function (p, i) {
      if (/^:/.test(p)) {
        var _extends2;
        var key = p.slice(1);
        var value = pathnameArr[i];
        // if a regex is provided, check it it matches
        if (regex && regex[key]) {
          var regexMatch = regex[key].test(value);
          if (!regexMatch) return null;
        }
        params = _extends({}, params, (_extends2 = {}, _extends2[key] = value, _extends2));
        pathArr[i] = pathnameArr[i];
      }
    });
    path = pathArr.join('/');
  }
  // catch all
  if (path === '*') match = [pathname];
  // regular path
  if (!match) match = new RegExp("^" + path).exec(pathname);
  if (!match) return null;
  var url = match[0];
  var isExact = pathname === url;
  if (exact && !isExact) return null;
  return {
    path: path,
    url: url,
    isExact: isExact,
    params: params
  };
};
var Switch = /*#__PURE__*/function (_Component) {
  function Switch() {
    var _this;
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _Component.call.apply(_Component, [this].concat(args)) || this;
    _this.index = 0;
    _this.path = '';
    _this.match = {
      index: -1,
      path: ''
    };
    return _this;
  }
  _inheritsLoose(Switch, _Component);
  var _proto = Switch.prototype;
  _proto.didMount = function didMount() {
    window.addEventListener('popstate', this.handleChanges.bind(this));
    register(this);
  };
  _proto.didUnmount = function didUnmount() {
    window.removeEventListener('popstate', this.handleChanges.bind(this));
    unregister(this);
  };
  _proto.handleChanges = function handleChanges() {
    this.findChild();
    if (this.shouldUpdate()) this.update();
  };
  _proto.findChild = function findChild() {
    this.match = {
      index: -1,
      path: ''
    };
    // flatten children
    this.props.children = this.props.children.flat();
    for (var i = 0; i < this.props.children.length; i++) {
      var child = this.props.children[i];
      var _child$props = child.props,
        path = _child$props.path,
        exact = _child$props.exact,
        regex = _child$props.regex;
      var match = matchPath(isSSR() ? _nano.location.pathname : window.location.pathname, {
        path: path,
        exact: exact,
        regex: regex
      });
      if (match) {
        this.match.index = i;
        this.match.path = path;
        return;
      }
    }
  };
  _proto.shouldUpdate = function shouldUpdate() {
    return this.path !== this.match.path || this.index !== this.match.index;
  };
  _proto.render = function render() {
    this.findChild();
    var child = this.props.children[this.match.index];
    if (this.match.index === -1) {
      this.path = '';
      this.index = 0;
    }
    if (child) {
      var path = child.props.path;
      this.path = path;
      this.index = this.match.index;
      var el = _render(child);
      return h('div', {}, _render(el));
    } else if (this.props.fallback) {
      return h('div', {}, _render(this.props.fallback));
    } else {
      return h('div', {}, 'not found');
    }
  };
  return Switch;
}(Component);
// alias for <Switch />
var Routes = /*#__PURE__*/function (_Switch2) {
  function Routes() {
    return _Switch2.apply(this, arguments) || this;
  }
  _inheritsLoose(Routes, _Switch2);
  return Routes;
}(Switch);
var Route = function Route(_ref) {
  var path = _ref.path,
    regex = _ref.regex,
    children = _ref.children;
  // lookup pathname and parameters
  var pathname = isSSR() ? _nano.location.pathname : window.location.pathname;
  var params = parseParamsFromPath(path);
  // pass the route as props to the children
  children.forEach(function (child) {
    if (child.props) child.props = _extends({}, child.props, {
      route: {
        path: path,
        regex: regex,
        pathname: pathname,
        params: params
      }
    });
  });
  return children;
};
var to = function to(_to, replace) {
  if (replace === void 0) {
    replace = false;
  }
  replace ? historyReplace(_to) : historyPush(_to);
};
var Link = function Link(_ref2) {
  var to = _ref2.to,
    replace = _ref2.replace,
    children = _ref2.children,
    rest = _objectWithoutPropertiesLoose(_ref2, _excluded$2);
  var handleClick = function handleClick(event) {
    event.preventDefault();
    replace ? historyReplace(to) : historyPush(to);
  };
  return h('a', _extends({
    href: to,
    onClick: function onClick(e) {
      return handleClick(e);
    }
  }, rest), children);
};
var CListener = /*#__PURE__*/function () {
  function CListener() {
    var _this2 = this;
    this._route = void 0;
    this._listeners = new Map();
    if (isSSR()) return;
    this._route = window.location.pathname;
    var event = function event() {
      var newRoute = window.location.pathname;
      _this2._listeners.forEach(function (fnc) {
        fnc(newRoute, _this2._route);
      });
      _this2._route = newRoute;
    };
    window.addEventListener('pushstate', event);
    window.addEventListener('replacestate', event);
  }
  var _proto2 = CListener.prototype;
  _proto2.use = function use() {
    var _this3 = this;
    var id = Math.random().toString(36).substring(2);
    return {
      subscribe: function subscribe(fnc) {
        _this3._listeners.set(id, fnc);
      },
      cancel: function cancel() {
        if (_this3._listeners.has(id)) _this3._listeners["delete"](id);
      }
    };
  };
  return CListener;
}();
var listener;
var Listener = function Listener() {
  if (!listener) listener = new CListener();
  return listener;
};
/** Pass "this.props.route.path" to it. */
var parseParamsFromPath = function parseParamsFromPath(path) {
  var params = {};
  var _pathname = isSSR() ? _nano.location.pathname.split('/') : window.location.pathname.split('/');
  path.split('/').forEach(function (p, i) {
    var _extends3;
    if (p.startsWith(':')) params = _extends({}, params, (_extends3 = {}, _extends3[p.slice(1)] = _pathname[i], _extends3));
  });
  return params;
};

var router = {
  __proto__: null,
  matchPath: matchPath,
  Switch: Switch,
  Routes: Routes,
  Route: Route,
  to: to,
  Link: Link,
  Listener: Listener,
  parseParamsFromPath: parseParamsFromPath
};

var _excluded$1 = ["children", "fallback", "cache"],
  _excluded2 = ["children", "fallback", "cache"],
  _excluded3 = ["children", "fallback", "cache"];
var Suspense = /*#__PURE__*/function (_Component) {
  function Suspense(props) {
    var _this;
    _this = _Component.call(this, props) || this;
    // get props promises in ...rest
    _this.ready = false;
    var _this$props = _this.props,
      rest = _objectWithoutPropertiesLoose(_this$props, _excluded$1);
    // stringify ...rest
    var str = JSON.stringify(rest, function (_key, val) {
      if (typeof val === 'function') return "" + val; // implicitly `toString` it
      return val;
    });
    // create unique id based on ...rest
    _this.id = strToHash(JSON.stringify(str));
    return _this;
  }
  _inheritsLoose(Suspense, _Component);
  var _proto = Suspense.prototype;
  _proto.didMount = function didMount() {
    try {
      var _this2 = this;
      // get props promises in ...rest
      var _this2$props = _this2.props,
        children = _this2$props.children,
        fallback = _this2$props.fallback,
        _this2$props$cache = _this2$props.cache,
        cache = _this2$props$cache === void 0 ? false : _this2$props$cache,
        rest = _objectWithoutPropertiesLoose(_this2$props, _excluded2);
      // set initial state to []
      if (cache) _this2.initState = {};
      // check if we already cached the results in this.state
      if (_this2.loadFromCache(cache)) return Promise.resolve();
      // resolve the promises
      var promises = Object.values(rest).map(function (p) {
        return p();
      });
      return Promise.resolve(Promise.all(promises)).then(function (resolved) {
        // prepare data
        var data = _this2.prepareData(rest, resolved, cache);
        // add data to children
        _this2.addDataToChildren(data);
        // update the component
        _this2.ready = true;
        _this2.update();
      });
    } catch (e) {
      return Promise.reject(e);
    }
  };
  _proto.ssr = function ssr() {
    // get props promises in ...rest
    var _this$props2 = this.props,
      rest = _objectWithoutPropertiesLoose(_this$props2, _excluded3);
    // execute the functions
    var functions = Object.values(rest).map(function (p) {
      return p();
    });
    // prepare data
    var data = this.prepareData(rest, functions, false);
    // add data to children
    this.addDataToChildren(data);
  };
  _proto.loadFromCache = function loadFromCache(cache) {
    var hasCachedProps = this.state && cache && Object.keys(this.state).length > 0;
    if (hasCachedProps) {
      this.addDataToChildren(this.state);
      this.ready = true;
    }
    return hasCachedProps;
  };
  _proto.prepareData = function prepareData(rest, fnc, cache) {
    var _this3 = this;
    var data = Object.keys(rest).reduce(function (obj, item, index) {
      var _extends2, _extends3;
      if (cache) _this3.state = _extends({}, _this3.state, (_extends2 = {}, _extends2[item] = fnc[index], _extends2));
      return _extends({}, obj, (_extends3 = {}, _extends3[item] = fnc[index], _extends3));
    }, {});
    return data;
  };
  _proto.addDataToChildren = function addDataToChildren(data) {
    // add data as props to children
    this.props.children.forEach(function (child) {
      if (child.props) child.props = _extends({}, child.props, data);
    });
  };
  _proto.render = function render() {
    if (!isSSR()) {
      var _this$props$cache2 = this.props.cache,
        cache = _this$props$cache2 === void 0 ? false : _this$props$cache2;
      this.loadFromCache(cache);
      return !this.ready ? this.props.fallback : this.props.children;
    } else {
      this.ssr();
      return this.props.children;
    }
  };
  return Suspense;
}(Component);

var Visible = /*#__PURE__*/function (_Component) {
  function Visible() {
    var _this;
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _Component.call.apply(_Component, [this].concat(args)) || this;
    _this.isVisible = false;
    return _this;
  }
  _inheritsLoose(Visible, _Component);
  var _proto = Visible.prototype;
  _proto.didMount = function didMount() {
    var _this2 = this;
    var observer = new IntersectionObserver(function (entries, observer) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          observer.disconnect();
          _this2.isVisible = true;
          _this2.update();
        }
      });
    }, {
      threshold: [0, 1]
    });
    observer.observe(this.elements[0]);
  };
  _proto.render = function render$1() {
    if (!this.isVisible) {
      return h('div', {
        'data-visible': false,
        visibility: 'hidden'
      });
    } else {
      if (this.props.onVisible) this.props.onVisible();
      return render(this.props.component || this.props.children[0]);
    }
  };
  return Visible;
}(Component);

var HTMLElementSSR = /*#__PURE__*/function () {
  function HTMLElementSSR(tag) {
    this.tagName = void 0;
    this.isSelfClosing = false;
    this.nodeType = null;
    this._ssr = void 0;
    this.tagName = tag;
    var selfClosing = ['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'param', 'source', 'track', 'wbr'];
    this.nodeType = 1;
    if (selfClosing.indexOf(tag) >= 0) {
      this._ssr = "<" + tag + " />";
      this.isSelfClosing = true;
    } else {
      this._ssr = "<" + tag + "></" + tag + ">";
    }
  }
  var _proto = HTMLElementSSR.prototype;
  _proto.getAttribute = function getAttribute(_name) {
    return null;
  };
  _proto.toString = function toString() {
    return this._ssr;
  };
  _proto.setAttributeNS = function setAttributeNS(_namespace, name, value) {
    this.setAttribute(name, value);
  };
  _proto.setAttribute = function setAttribute(name, value) {
    var replacer1 = function replacer1(_match, p1, p2) {
      return "" + p1 + escapeHtml(name) + "=\"" + escapeHtml(value) + "\" " + p2;
    };
    var replacer2 = function replacer2(_match, p1, p2) {
      return p1 + " " + escapeHtml(name) + "=\"" + escapeHtml(value) + "\"" + p2;
    };
    if (this.isSelfClosing) this._ssr = this._ssr.replace(/(^<[a-z0-9]+ )(.+)/gm, replacer1);else this._ssr = this._ssr.replace(/(^<[^>]+)(.+)/gm, replacer2);
  };
  _proto.append = function append(child) {
    this.appendChild(child);
  };
  _proto.appendChild = function appendChild(child) {
    var index = this._ssr.lastIndexOf('</');
    this._ssr = this._ssr.substring(0, index) + child + this._ssr.substring(index);
  };
  _proto.addEventListener = function addEventListener(_type, _listener, _options) {};
  return _createClass(HTMLElementSSR, [{
    key: "outerHTML",
    get: function get() {
      return this.toString();
    }
  }, {
    key: "innerHTML",
    get: function get() {
      return this.innerText;
    },
    set: function set(text) {
      this.innerText = text;
    }
  }, {
    key: "innerText",
    get: function get() {
      var _reg$exec;
      var reg = /(^<[^>]+>)(.+)?(<\/[a-z0-9]+>$|\/>$)/gm;
      return ((_reg$exec = reg.exec(this._ssr)) == null ? void 0 : _reg$exec[2]) || '';
    },
    set: function set(text) {
      var reg = /(^<[^>]+>)(.+)?(<\/[a-z0-9]+>$|\/>$)/gm;
      var replacer = function replacer(_match, p1, _p2, p3) {
        return [p1, text, p3].join('');
      };
      this._ssr = this._ssr.replace(reg, replacer);
    }
  }, {
    key: "classList",
    get: function get() {
      var _this = this;
      var element = this._ssr;
      var classesRegex = /^<\w+.+(\sclass=")([^"]+)"/gm;
      return {
        add: function add(name) {
          _this.setAttribute('class', name);
        },
        entries: {
          get length() {
            var classes = classesRegex.exec(element);
            if (classes && classes[2]) return classes[2].split(' ').length;
            return 0;
          }
        }
      };
    }
  }, {
    key: "children",
    get: function get() {
      var reg = /<([a-z0-9]+)((?!<\/\1)[\s\S])*<\/\1>/gm;
      var array = [];
      var match;
      while ((match = reg.exec(this.innerHTML)) !== null) {
        array.push(match[0].replace(/[\s]+/gm, ' '));
      }
      return array;
    }
  }]);
}();
var DocumentSSR = /*#__PURE__*/function () {
  function DocumentSSR() {
    this.body = void 0;
    this.head = void 0;
    this.body = this.createElement('body');
    this.head = this.createElement('head');
  }
  var _proto2 = DocumentSSR.prototype;
  _proto2.createElement = function createElement(tag) {
    return new HTMLElementSSR(tag);
  };
  _proto2.createElementNS = function createElementNS(_URI, tag) {
    return this.createElement(tag);
  };
  _proto2.createTextNode = function createTextNode(text) {
    return escapeHtml(text);
  };
  _proto2.querySelector = function querySelector(_query) {
    return undefined;
  };
  return DocumentSSR;
}();
var documentSSR = function documentSSR() {
  return new DocumentSSR();
};

// functions that should only be available on the server-side
var ssrTricks = {
  isWebComponent: function isWebComponent(tagNameOrComponent) {
    return typeof tagNameOrComponent === 'string' && tagNameOrComponent.includes('-') && _nano.customElements.has(tagNameOrComponent);
  },
  renderWebComponent: function renderWebComponent(tagNameOrComponent, props, children, _render) {
    var customElement = _nano.customElements.get(tagNameOrComponent);
    var component = _render({
      component: customElement,
      props: _extends({}, props, {
        children: children
      })
    });
    // get the html tag and the innerText from string
    // match[1]: HTMLTag
    // match[2]: innerText
    var match = component.toString().match( /*#__PURE__*/_wrapRegExp(/^<([a-z]+)>(.*)<\/\1>$/, {
      tag: 1
    }));
    if (match) {
      // eslint-disable-next-line no-inner-declarations
      var replacer = function replacer(match, p1, _offset, _string) {
        return match.replace(p1, '');
      }; // remove events like onClick from DOM
      var element = document.createElement(match[1]);
      element.innerText = match[2];
      element.innerText = element.innerText.replace(/<\w+[^>]*(\s(on\w*)="[^"]*")/gm, replacer);
      return element;
    } else {
      return null;
    }
  }
};
var initGlobalVar = function initGlobalVar() {
  var isSSR = detectSSR() === true ? true : undefined;
  var location = {
    pathname: '/'
  };
  var document = isSSR ? documentSSR() : window.document;
  globalThis._nano = {
    isSSR: isSSR,
    location: location,
    document: document,
    customElements: new Map(),
    ssrTricks: ssrTricks
  };
};
initGlobalVar();
var initSSR = function initSSR(pathname) {
  if (pathname === void 0) {
    pathname = '/';
  }
  _nano.location = {
    pathname: pathname
  };
  globalThis.document = _nano.document = isSSR() ? documentSSR() : window.document;
};
var renderSSR = function renderSSR(component, options) {
  if (options === void 0) {
    options = {};
  }
  var _options = options,
    pathname = _options.pathname,
    _options$clearState = _options.clearState,
    clearState = _options$clearState === void 0 ? true : _options$clearState;
  initSSR(pathname);
  if (clearState) _state.clear();
  var tmp = render(component, null, true);
  if (Array.isArray(tmp)) return tmp.join('');else return Array.from(tmp).join('');
};

var MODE_SLASH = 0;
var MODE_TEXT = 1;
var MODE_WHITESPACE = 2;
var MODE_TAGNAME = 3;
var MODE_COMMENT = 4;
var MODE_PROP_SET = 5;
var MODE_PROP_APPEND = 6;
var CHILD_APPEND = 0;
var CHILD_RECURSE = 2;
var TAG_SET = 3;
var PROPS_ASSIGN = 4;
var PROP_SET = MODE_PROP_SET;
var PROP_APPEND = MODE_PROP_APPEND;
var evaluate = function evaluate(h, built, fields, args) {
  var tmp;
  // `build()` used the first element of the operation list as
  // temporary workspace. Now that `build()` is done we can use
  // that space to track whether the current element is "dynamic"
  // (i.e. it or any of its descendants depend on dynamic values).
  built[0] = 0;
  for (var i = 1; i < built.length; i++) {
    var type = built[i++];
    // Set `built[0]`'s appropriate bits if this element depends on a dynamic value.
    var value = built[i] ? (built[0] |= type ? 1 : 2, fields[built[i++]]) : built[++i];
    if (type === TAG_SET) {
      args[0] = value;
    } else if (type === PROPS_ASSIGN) {
      args[1] = Object.assign(args[1] || {}, value);
    } else if (type === PROP_SET) {
      (args[1] = args[1] || {})[built[++i]] = value;
    } else if (type === PROP_APPEND) {
      args[1][built[++i]] += "" + value;
    } else if (type) {
      // type === CHILD_RECURSE
      // Set the operation list (including the staticness bits) as
      // `this` for the `h` call.
      tmp = h.apply(value, evaluate(h, value, fields, ['', null]));
      args.push(tmp);
      if (value[0]) {
        // Set the 2nd lowest bit it the child element is dynamic.
        built[0] |= 2;
      } else {
        // Rewrite the operation list in-place if the child element is static.
        // The currently evaluated piece `CHILD_RECURSE, 0, [...]` becomes
        // `CHILD_APPEND, 0, tmp`.
        // Essentially the operation list gets optimized for potential future
        // re-evaluations.
        built[i - 2] = CHILD_APPEND;
        built[i] = tmp;
      }
    } else {
      // type === CHILD_APPEND
      args.push(value);
    }
  }
  return args;
};
var build = function build(statics) {
  [statics].concat([].slice.call(arguments, 1));
  var mode = MODE_TEXT;
  var buffer = '';
  var quote = '';
  var current = [0];
  var _char;
  var propName;
  var commit = function commit(field) {
    if (mode === MODE_TEXT && (field || (buffer = buffer.replace(/^\s*\n\s*|\s*\n\s*$/g, '')))) {
      {
        current.push(CHILD_APPEND, field, buffer);
      }
    } else if (mode === MODE_TAGNAME && (field || buffer)) {
      {
        current.push(TAG_SET, field, buffer);
      }
      mode = MODE_WHITESPACE;
    } else if (mode === MODE_WHITESPACE && buffer === '...' && field) {
      {
        current.push(PROPS_ASSIGN, field, 0);
      }
    } else if (mode === MODE_WHITESPACE && buffer && !field) {
      {
        current.push(PROP_SET, 0, true, buffer);
      }
    } else if (mode >= MODE_PROP_SET) {
      {
        if (buffer || !field && mode === MODE_PROP_SET) {
          current.push(mode, 0, buffer, propName);
          mode = MODE_PROP_APPEND;
        }
        if (field) {
          current.push(mode, field, 0, propName);
          mode = MODE_PROP_APPEND;
        }
      }
    }
    buffer = '';
  };
  for (var i = 0; i < statics.length; i++) {
    if (i) {
      if (mode === MODE_TEXT) {
        commit();
      }
      commit(i);
    }
    for (var j = 0; j < statics[i].length; j++) {
      _char = statics[i][j];
      if (mode === MODE_TEXT) {
        if (_char === '<') {
          // commit buffer
          commit();
          {
            current = [current];
          }
          mode = MODE_TAGNAME;
        } else {
          buffer += _char;
        }
      } else if (mode === MODE_COMMENT) {
        // Ignore everything until the last three characters are '-', '-' and '>'
        if (buffer === '--' && _char === '>') {
          mode = MODE_TEXT;
          buffer = '';
        } else {
          buffer = _char + buffer[0];
        }
      } else if (quote) {
        if (_char === quote) {
          quote = '';
        } else {
          buffer += _char;
        }
      } else if (_char === '"' || _char === "'") {
        quote = _char;
      } else if (_char === '>') {
        commit();
        mode = MODE_TEXT;
      } else if (!mode) ; else if (_char === '=') {
        mode = MODE_PROP_SET;
        propName = buffer;
        buffer = '';
      } else if (_char === '/' && (mode < MODE_PROP_SET || statics[i][j + 1] === '>')) {
        commit();
        if (mode === MODE_TAGNAME) {
          current = current[0];
        }
        mode = current;
        {
          (current = current[0]).push(CHILD_RECURSE, 0, mode);
        }
        mode = MODE_SLASH;
      } else if (_char === ' ' || _char === '\t' || _char === '\n' || _char === '\r') {
        // <a disabled>
        commit();
        mode = MODE_WHITESPACE;
      } else {
        buffer += _char;
      }
      if (mode === MODE_TAGNAME && buffer === '!--') {
        mode = MODE_COMMENT;
        current = current[0];
      }
    }
  }
  commit();
  return current;
};

/**
 * Copyright 2018 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *     http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var CACHES = new Map();
var regular = function regular(statics) {
  var tmp = CACHES.get(this);
  if (!tmp) {
    tmp = new Map();
    CACHES.set(this, tmp);
  }
  tmp = evaluate(this, tmp.get(statics) || (tmp.set(statics, tmp = build(statics)), tmp), arguments, []);
  return tmp.length > 1 ? tmp : tmp[0];
};
// export as htm
var htm = regular;

var jsx = htm.bind(h);

var hydrateLazy = function hydrateLazy(component, parent, removeChildNodes) {
  if (parent === void 0) {
    parent = null;
  }
  if (removeChildNodes === void 0) {
    removeChildNodes = true;
  }
  var c = h(Visible, null, component);
  return hydrate(c, parent, removeChildNodes);
};

var Store = /*#__PURE__*/function () {
  /**
   * Create your own Store.
   * @param defaultState Pass the initial State.
   * @param name The name of the Store (only required if you persist the state in localStorage or sessionStorage).
   * @param storage Pass 'memory', 'local' or 'session'.
   */
  function Store(defaultState, name, storage) {
    if (name === void 0) {
      name = '';
    }
    if (storage === void 0) {
      storage = 'memory';
    }
    this._state = void 0;
    this._prevState = void 0;
    this._listeners = new Map();
    this._storage = void 0;
    this._id = void 0;
    if (isSSR()) storage = 'memory';
    this._id = name;
    this._storage = storage;
    this._state = this._prevState = defaultState;
    if (storage === 'memory' || !storage) return;
    var Storage = storage === 'local' ? localStorage : sessionStorage;
    // get/set initial state of Storage
    var item = Storage.getItem(this._id);
    if (item) {
      this._state = this._prevState = JSON.parse(item);
    } else Storage.setItem(this._id, JSON.stringify(defaultState));
  }
  var _proto = Store.prototype;
  _proto.persist = function persist(newState) {
    if (this._storage === 'memory') return;
    var Storage = this._storage === 'local' ? localStorage : sessionStorage;
    Storage.setItem(this._id, JSON.stringify(newState));
  }
  /** Clears the state of the whole store. */;
  _proto.clear = function clear() {
    // @ts-ignore
    this._state = this._prevState = undefined;
    if (this._storage === 'local') localStorage.removeItem(this._id);else if (this._storage === 'session') sessionStorage.removeItem(this._id);
  };
  _proto.setState = function setState(newState) {
    this.state = newState;
  };
  _proto.use = function use() {
    var _this2 = this;
    var id = Math.random().toString(36).substring(2, 9);
    var _this = this;
    return {
      get state() {
        return _this.state;
      },
      setState: function setState(newState) {
        _this2.state = newState;
      },
      subscribe: function subscribe(fnc) {
        _this2._listeners.set(id, fnc);
      },
      cancel: function cancel() {
        if (_this2._listeners.has(id)) _this2._listeners["delete"](id);
      }
    };
  };
  return _createClass(Store, [{
    key: "state",
    get: function get() {
      return this._state;
    },
    set: function set(newState) {
      var _this3 = this;
      this._prevState = this._state;
      this._state = newState;
      this.persist(newState);
      this._listeners.forEach(function (fnc) {
        fnc(_this3._state, _this3._prevState);
      });
    }
  }]);
}();

var createContext = function createContext(ctx) {
  var _ctx = ctx;
  return {
    Provider: function Provider(props) {
      if (props.value) _ctx = props.value;
      return props.children;
    },
    Consumer: function Consumer(props) {
      return {
        component: props.children[0](_ctx),
        props: _extends({}, props, {
          context: _ctx
        })
      };
    },
    get: function get() {
      return _ctx;
    },
    set: function set(ctx) {
      return _ctx = ctx;
    }
  };
};
var useContext = function useContext(ctx) {
  var _ctx = ctx;
  if (_ctx && typeof _ctx.get === 'function') {
    return _ctx.get();
  }
};

var _excluded = ["children"];
var withStyles = function withStyles() {
  var styles = [].slice.call(arguments);
  return function (WrappedComponent) {
    return /*#__PURE__*/function (_Component) {
      function _class() {
        return _Component.apply(this, arguments) || this;
      }
      _inheritsLoose(_class, _Component);
      var _proto = _class.prototype;
      _proto.render = function render() {
        var _this$props = this.props,
          children = _this$props.children,
          rest = _objectWithoutPropertiesLoose(_this$props, _excluded);
        var helmets = [];
        styles.forEach(function (style) {
          if (typeof style === 'string') {
            helmets.push(h(Helmet, null, h('style', null, style)));
          } else if (typeof style === 'function') {
            var _style = style();
            if (typeof _style === 'string') {
              helmets.push(h(Helmet, null, h('style', null, _style)));
            }
          } else if (typeof style === 'object') {
            var _style2 = style.toString == null ? void 0 : style.toString();
            if (typeof _style2 === 'string') {
              helmets.push(h(Helmet, null, h('style', null, _style2)));
            }
          }
        });
        var component = children && children.length > 0 ? h(WrappedComponent, _extends({}, rest), children) : h(WrappedComponent, _extends({}, this.props));
        return h.apply(void 0, [Fragment, null].concat(helmets, [component]));
      };
      return _class;
    }(Component);
  };
};

var defineAsCustomElementsSSR = function defineAsCustomElementsSSR(component, componentName, _publicProps, _options) {
  if (!/^[a-zA-Z0-9]+-[a-zA-Z0-9]+$/.test(componentName)) console.log("Error: WebComponent name \"" + componentName + "\" is invalid.");else _nano.customElements.set(componentName, component);
};
var defineAsCustomElements = function defineAsCustomElements(component, componentName, publicProps, shadow) {
  if (isSSR()) {
    defineAsCustomElementsSSR(component, componentName);
    return;
  }
  customElements.define(componentName, /*#__PURE__*/function (_HTMLElement) {
    function _class() {
      var _this;
      _this = _HTMLElement.call(this) || this;
      _this.component = void 0;
      _this.$root = void 0;
      _this.isFunctionalComponent = void 0;
      _this.functionalComponentsProps = void 0;
      if (shadow) {
        _this.attachShadow(shadow);
        _this.$root = _this.shadowRoot;
      } else {
        _this.$root = _this;
      }
      var _ref;
      var el = _this.buildEl(_render({
        component: component,
        props: {
          ref: function ref(r) {
            return _ref = r;
          },
          children: Array.from(_this.children).map(function (c) {
            return render(c);
          })
        }
      }));
      // ------------------------------ first render
      _this.component = _ref;
      _this.isFunctionalComponent = !component.isClass;
      _this.functionalComponentsProps = {};
      _this.appendEl(el);
      // ------------------------------------------
      if (!_this.isFunctionalComponent) {
        _this.component.updatePropsValue = function (name, value) {
          // @ts-ignore
          if (!_this.component.props) _this.component.props = {};
          _this.component.props[name] = value;
          _this.component[name] = value;
        };
      }
      return _this;
    }
    _inheritsLoose(_class, _HTMLElement);
    var _proto = _class.prototype;
    _proto.buildEl = function buildEl(contents) {
      // because nano-jsx update needs parentElement, we need
      // to wrap the element in a div when using shadow mode
      return h(this.shadowRoot ? 'div' : 'template', null, contents);
    };
    _proto.appendEl = function appendEl(el) {
      if (this.shadowRoot) {
        // el.dataset.wcRoot = true
        this.$root.append(el);
      } else {
        var _this$$root;
        (_this$$root = this.$root).append.apply(_this$$root, el.childNodes);
      }
    };
    _proto.removeChildren = function removeChildren() {
      if (this.$root) {
        var _this$$root2;
        var children = Array.from((_this$$root2 = this.$root) == null ? void 0 : _this$$root2.children) || [];
        for (var _iterator = _createForOfIteratorHelperLoose(children), _step; !(_step = _iterator()).done;) {
          var el = _step.value;
          el.remove();
        }
      }
    };
    _proto.attributeChangedCallback = function attributeChangedCallback(name, _, newValue) {
      var _this2 = this;
      if (!this.isFunctionalComponent) {
        this.component.updatePropsValue(name, newValue);
        this.component.update();
      } else {
        this.removeChildren();
        this.functionalComponentsProps[name] = newValue;
        var el = this.buildEl(_render({
          component: component,
          props: _extends({
            children: [],
            ref: function ref(r) {
              return _this2.component = r;
            }
          }, this.functionalComponentsProps)
        }));
        this.appendEl(el);
      }
    };
    return _createClass(_class, null, [{
      key: "observedAttributes",
      get: function get() {
        return publicProps;
      }
    }]);
  }( /*#__PURE__*/_wrapNativeSuper(HTMLElement)));
};

// core
var index = {
  h: h,
  render: render,
  hydrate: hydrate,
  renderSSR: renderSSR,
  isSSR: isSSR
};

export { Component, Fragment, Helmet, Img, Link$1 as Link, router as Router, Store, Suspense, VERSION, Visible, createContext, index as default, defineAsCustomElements, h, hydrate, hydrateLazy, isSSR, jsx, nodeToString, printVersion, render, renderSSR, task, tick, useContext, withStyles };
//# sourceMappingURL=index.module.js.map

import { EMPTY_OBJ } from "./constants";
import { commitRoot, diff } from "./diff/index";
import { createElement, Fragment } from "./create-element";
import options from "./options";
import { slice } from "./util";

/**
 * Render a Preact virtual node into a DOM element
 * @param {ComponentChild} vnode The virtual node to render
 * @param {PreactElement} parentDom The DOM element to render into
 * @param {PreactElement | object} [replaceNode] Optional: Attempt to re-use an
 * existing DOM tree rooted at `replaceNode`
 */
export function render(vnode, parentDom) {
  const newNode = (parentDom._children = createElement(Fragment, null, vnode));
  newNode._component = new newNode.type(newNode.props);
  console.log("newNode", newNode);

  // if (options._root) options._root(vnode, parentDom);

  // We abuse the `replaceNode` parameter in `hydrate()` to signal if we are in
  // hydration mode or not by passing the `hydrate` function instead of a DOM
  // element..
  // let isHydrating = typeof replaceNode == 'function';
  //
  // let oldVNode = isHydrating
  // 	? null
  // 	: (replaceNode && replaceNode._children) || parentDom._children;
  //
  // vnode = ((!isHydrating && replaceNode) || parentDom)._children =
  // 	createElement(Fragment, null, [vnode]);

  // List of effects that need to be called after diffing.
  // let commitQueue = [],
  // 	refQueue = [];
  // diff(
  // 	parentDom,
  // 	// Determine the new vnode tree and store it on the DOM element on
  // 	// our custom `_children` property.
  // 	vnode,
  // 	oldVNode || EMPTY_OBJ,
  // 	EMPTY_OBJ,
  // 	parentDom.namespaceURI,
  // 	!isHydrating && replaceNode
  // 		? [replaceNode]
  // 		: oldVNode
  // 			? null
  // 			: parentDom.firstChild
  // 				? slice.call(parentDom.childNodes)
  // 				: null,
  // 	commitQueue,
  // 	!isHydrating && replaceNode
  // 		? replaceNode
  // 		: oldVNode
  // 			? oldVNode._dom
  // 			: parentDom.firstChild,
  // 	isHydrating,
  // 	refQueue
  // );

  // Flush all queued effects
  // commitRoot(commitQueue, vnode, refQueue);
}

/**
 * Update an existing DOM element with data from a Preact virtual node
 * @param {ComponentChild} vnode The virtual node to render
 * @param {PreactElement} parentDom The DOM element to update
 */
export function hydrate(vnode, parentDom) {
  render(vnode, parentDom, hydrate);
}

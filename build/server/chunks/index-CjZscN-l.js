const HYDRATION_START = "[";
const HYDRATION_END = "]";
const HYDRATION_ERROR = {};
const UNINITIALIZED = Symbol();
function lifecycle_outside_component(name) {
  {
    throw new Error(`https://svelte.dev/e/lifecycle_outside_component`);
  }
}
var current_component = null;
function getContext(key) {
  const context_map = get_or_init_context_map();
  const result = (
    /** @type {T} */
    context_map.get(key)
  );
  return result;
}
function setContext(key, context) {
  get_or_init_context_map().set(key, context);
  return context;
}
function get_or_init_context_map(name) {
  if (current_component === null) {
    lifecycle_outside_component();
  }
  return current_component.c ??= new Map(get_parent_context(current_component) || void 0);
}
function push(fn) {
  current_component = { p: current_component, c: null, d: null };
}
function pop() {
  var component = (
    /** @type {Component} */
    current_component
  );
  var ondestroy = component.d;
  if (ondestroy) {
    on_destroy.push(...ondestroy);
  }
  current_component = component.p;
}
function get_parent_context(component_context) {
  let parent = component_context.p;
  while (parent !== null) {
    const context_map = parent.c;
    if (context_map !== null) {
      return context_map;
    }
    parent = parent.p;
  }
  return null;
}
const BLOCK_OPEN = `<!--${HYDRATION_START}-->`;
const BLOCK_CLOSE = `<!--${HYDRATION_END}-->`;
class HeadPayload {
  /** @type {Set<{ hash: string; code: string }>} */
  css = /* @__PURE__ */ new Set();
  out = "";
  uid = () => "";
  title = "";
  constructor(css = /* @__PURE__ */ new Set(), out = "", title = "", uid = () => "") {
    this.css = css;
    this.out = out;
    this.title = title;
    this.uid = uid;
  }
}
class Payload {
  /** @type {Set<{ hash: string; code: string }>} */
  css = /* @__PURE__ */ new Set();
  out = "";
  uid = () => "";
  select_value = void 0;
  head = new HeadPayload();
  constructor(id_prefix = "") {
    this.uid = props_id_generator(id_prefix);
    this.head.uid = this.uid;
  }
}
function props_id_generator(prefix) {
  let uid = 1;
  return () => `${prefix}s${uid++}`;
}
let on_destroy = [];
function render(component, options = {}) {
  const payload = new Payload(options.idPrefix ? options.idPrefix + "-" : "");
  const prev_on_destroy = on_destroy;
  on_destroy = [];
  payload.out += BLOCK_OPEN;
  if (options.context) {
    push();
    current_component.c = options.context;
  }
  component(payload, options.props ?? {}, {}, {});
  if (options.context) {
    pop();
  }
  payload.out += BLOCK_CLOSE;
  for (const cleanup of on_destroy) cleanup();
  on_destroy = prev_on_destroy;
  let head = payload.head.out + payload.head.title;
  for (const { hash, code } of payload.css) {
    head += `<style id="${hash}">${code}</style>`;
  }
  return {
    head,
    html: payload.out,
    body: payload.out
  };
}

export { HYDRATION_START as H, UNINITIALIZED as U, HYDRATION_ERROR as a, HYDRATION_END as b, pop as c, getContext as g, push as p, render as r, setContext as s };
//# sourceMappingURL=index-CjZscN-l.js.map

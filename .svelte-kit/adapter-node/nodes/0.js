

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export const imports = ["_app/immutable/nodes/0.blrKUnzG.js","_app/immutable/chunks/CCk31iyD.js","_app/immutable/chunks/BYaMxL52.js"];
export const stylesheets = ["_app/immutable/assets/0.BhXNRSpX.css"];
export const fonts = [];

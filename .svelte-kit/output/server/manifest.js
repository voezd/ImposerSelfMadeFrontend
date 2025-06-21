export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["favicon.png"]),
	mimeTypes: {".png":"image/png"},
	_: {
		client: {start:"_app/immutable/entry/start.ZCN7vTxl.js",app:"_app/immutable/entry/app.B2y9DHoy.js",imports:["_app/immutable/entry/start.ZCN7vTxl.js","_app/immutable/chunks/CqPE2T0Y.js","_app/immutable/chunks/BYaMxL52.js","_app/immutable/chunks/BK0stXEO.js","_app/immutable/entry/app.B2y9DHoy.js","_app/immutable/chunks/BYaMxL52.js","_app/immutable/chunks/Dt4bcHTa.js","_app/immutable/chunks/CCk31iyD.js","_app/immutable/chunks/BK0stXEO.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/2.js'))
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			}
		],
		prerendered_routes: new Set([]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();

"use strict";
exports.__esModule = true;
exports.trpcRouter = void 0;
var index_js_1 = require("~/hello/index.js");
var trpc_js_1 = require("./trpc.js");
exports.trpcRouter = trpc_js_1.t.router({
    hello: (0, index_js_1.helloRouter)()
});

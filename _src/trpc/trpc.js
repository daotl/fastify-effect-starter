"use strict";
exports.__esModule = true;
exports.p = exports.t = void 0;
var server_1 = require("@trpc/server");
var superjson_1 = require("superjson");
exports.t = server_1.initTRPC.context().create({
    transformer: superjson_1["default"],
    errorFormatter: function (_a) {
        var shape = _a.shape;
        return shape;
    }
});
exports.p = {
    public: exports.t.procedure,
    optional: exports.t.procedure,
    protected: exports.t.procedure,
    admin: exports.t.procedure
};

"use strict";
exports.__esModule = true;
exports.createContext = void 0;
function createContext(_a) {
    var _b;
    var req = _a.req, res = _a.res;
    var user = { name: (_b = req.headers['username']) !== null && _b !== void 0 ? _b : 'anonymous' };
    return { req: req, res: res, user: user };
}
exports.createContext = createContext;

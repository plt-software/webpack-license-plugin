"use strict";
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
var webpack = require("webpack");
var WebpackAlertAggregator = /** @class */ (function () {
    function WebpackAlertAggregator(compilation) {
        this.compilation = compilation;
        this.errors = [];
        this.warnings = [];
    }
    WebpackAlertAggregator.prototype.addError = function (message) {
        this.errors.push(message);
    };
    WebpackAlertAggregator.prototype.addWarning = function (message) {
        this.warnings.push(message);
    };
    WebpackAlertAggregator.prototype.flushAlerts = function (prefix) {
        var _a, _b;
        (_a = this.compilation.errors).push.apply(_a, __spread(this.errors.map(function (e) { return new webpack.WebpackError(prefix + ": " + e); })));
        this.errors = [];
        (_b = this.compilation.warnings).push.apply(_b, __spread(this.warnings.map(function (w) { return new webpack.WebpackError(prefix + ": " + w); })));
        this.warnings = [];
    };
    return WebpackAlertAggregator;
}());
exports.default = WebpackAlertAggregator;
//# sourceMappingURL=WebpackAlertAggregator.js.map
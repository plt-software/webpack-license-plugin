"use strict";
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
Object.defineProperty(exports, "__esModule", { value: true });
var WebpackChunkModuleIterator_1 = require("./WebpackChunkModuleIterator");
var WebpackModuleFileIterator_1 = require("./WebpackModuleFileIterator");
var WebpackChunkIterator = /** @class */ (function () {
    function WebpackChunkIterator(compilation, moduleIterator, fileIterator) {
        if (moduleIterator === void 0) { moduleIterator = new WebpackChunkModuleIterator_1.default(); }
        if (fileIterator === void 0) { fileIterator = new WebpackModuleFileIterator_1.default(); }
        this.moduleIterator = moduleIterator;
        this.fileIterator = fileIterator;
        this.compilation = compilation;
    }
    WebpackChunkIterator.prototype.iterateChunks = function (chunks) {
        var e_1, _a;
        var _this = this;
        var filenames = [];
        try {
            for (var chunks_1 = __values(chunks), chunks_1_1 = chunks_1.next(); !chunks_1_1.done; chunks_1_1 = chunks_1.next()) {
                var chunk = chunks_1_1.value;
                this.moduleIterator.iterateModules(this.compilation, chunk, function (module) {
                    _this.fileIterator.iterateFiles(module, function (filename) {
                        filenames.push(filename);
                    });
                });
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (chunks_1_1 && !chunks_1_1.done && (_a = chunks_1.return)) _a.call(chunks_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return filenames;
    };
    return WebpackChunkIterator;
}());
exports.default = WebpackChunkIterator;
//# sourceMappingURL=WebpackChunkIterator.js.map
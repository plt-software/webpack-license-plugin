"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var WebpackChunkModuleIterator = /** @class */ (function () {
    function WebpackChunkModuleIterator() {
    }
    WebpackChunkModuleIterator.prototype.iterateModules = function (compilation, chunk, callback) {
        compilation.chunkGraph.getChunkModules(chunk).forEach(function (module) {
            callback(module);
        });
    };
    return WebpackChunkModuleIterator;
}());
exports.default = WebpackChunkModuleIterator;
//# sourceMappingURL=WebpackChunkModuleIterator.js.map
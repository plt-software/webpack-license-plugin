"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var LicenseFileWriter_1 = require("./LicenseFileWriter");
var LicenseMetaAggregator_1 = require("./LicenseMetaAggregator");
var ModuleDirectoryLocator_1 = require("./ModuleDirectoryLocator");
var OptionsProvider_1 = require("./OptionsProvider");
var PackageJsonReader_1 = require("./PackageJsonReader");
var WebpackAlertAggregator_1 = require("./WebpackAlertAggregator");
var WebpackAssetManager_1 = require("./WebpackAssetManager");
var WebpackChunkIterator_1 = require("./WebpackChunkIterator");
var WebpackFileSystem_1 = require("./WebpackFileSystem");
var pluginName = 'WebpackLicensePlugin';
/**
 * @todo "emit" vs "compilation" & "optimizeChunkAssets" hooks
 * @todo add banner to chunks? boolean option + banner formatter?
 * @todo override license text or license filename
 * @todo override for version ranges or *
 * @todo select output fields
 * @todo error on missing license text?
 * @todo preferred license types on ambiguity (licenses array or spdx expression)
 */
var WebpackLicensePlugin = /** @class */ (function () {
    function WebpackLicensePlugin(pluginOptions) {
        if (pluginOptions === void 0) { pluginOptions = {}; }
        this.pluginOptions = pluginOptions;
    }
    WebpackLicensePlugin.prototype.apply = function (compiler) {
        if (typeof compiler.hooks !== 'undefined') {
            compiler.hooks.thisCompilation.tap('webpack-license-plugin', this.handleCompilation.bind(this, compiler));
        }
    };
    WebpackLicensePlugin.prototype.handleCompilation = function (compiler, compilation) {
        compilation.hooks.processAssets.tapPromise({
            name: 'webpack-license-plugin',
            stage: compiler.webpack.Compilation.PROCESS_ASSETS_STAGE_ADDITIONAL,
        }, this.handleProcessAssets.bind(this, compiler, compilation, null));
    };
    WebpackLicensePlugin.prototype.handleProcessAssets = function (compiler, compilation) {
        return __awaiter(this, void 0, void 0, function () {
            var alertAggregator, optionsProvider, options, chunkIterator, filenames, fileSystem, packageJsonReader, licenseFileWriter;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        alertAggregator = new WebpackAlertAggregator_1.default(compilation);
                        optionsProvider = new OptionsProvider_1.default(alertAggregator);
                        options = optionsProvider.getOptions(this.pluginOptions);
                        alertAggregator.flushAlerts(pluginName);
                        chunkIterator = new WebpackChunkIterator_1.default(compilation);
                        filenames = chunkIterator.iterateChunks(Array.from(compilation.chunks));
                        fileSystem = new WebpackFileSystem_1.default(compiler.inputFileSystem);
                        packageJsonReader = new PackageJsonReader_1.default(fileSystem);
                        licenseFileWriter = new LicenseFileWriter_1.default(new WebpackAssetManager_1.default(compilation), new ModuleDirectoryLocator_1.default(fileSystem, compiler.options.context, packageJsonReader), new LicenseMetaAggregator_1.default(fileSystem, alertAggregator, options, packageJsonReader));
                        return [4 /*yield*/, licenseFileWriter.writeLicenseFiles(filenames, options)];
                    case 1:
                        _a.sent();
                        alertAggregator.flushAlerts(pluginName);
                        return [2 /*return*/];
                }
            });
        });
    };
    return WebpackLicensePlugin;
}());
exports.default = WebpackLicensePlugin;
//# sourceMappingURL=WebpackLicensePlugin.js.map
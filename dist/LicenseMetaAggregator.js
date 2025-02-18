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
var get_npm_tarball_url_1 = require("get-npm-tarball-url");
var LicenseIdentifier_1 = require("./LicenseIdentifier");
var LicenseTextReader_1 = require("./LicenseTextReader");
var LicenseMetaAggregator = /** @class */ (function () {
    function LicenseMetaAggregator(fileSystem, alertAggregator, options, packageJsonReader, licenseIdentifier, licenseTextReader) {
        if (licenseIdentifier === void 0) { licenseIdentifier = new LicenseIdentifier_1.default(alertAggregator); }
        if (licenseTextReader === void 0) { licenseTextReader = new LicenseTextReader_1.default(alertAggregator, fileSystem, options); }
        this.options = options;
        this.packageJsonReader = packageJsonReader;
        this.licenseIdentifier = licenseIdentifier;
        this.licenseTextReader = licenseTextReader;
    }
    LicenseMetaAggregator.prototype.aggregateMeta = function (moduleDirs) {
        return __awaiter(this, void 0, void 0, function () {
            var packageSet, result, sortedModuleDirs, sortedModuleDirs_1, sortedModuleDirs_1_1, moduleDir, meta, packageIdentifier, license, licenseText, e_1_1;
            var e_1, _a;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        packageSet = new Set();
                        result = [];
                        sortedModuleDirs = moduleDirs.sort(function (a, b) {
                            return _this.packageJsonReader
                                .readPackageJson(a)
                                .name.localeCompare(_this.packageJsonReader.readPackageJson(b).name);
                        });
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 6, 7, 8]);
                        sortedModuleDirs_1 = __values(sortedModuleDirs), sortedModuleDirs_1_1 = sortedModuleDirs_1.next();
                        _b.label = 2;
                    case 2:
                        if (!!sortedModuleDirs_1_1.done) return [3 /*break*/, 5];
                        moduleDir = sortedModuleDirs_1_1.value;
                        meta = this.packageJsonReader.readPackageJson(moduleDir);
                        packageIdentifier = meta.name + "@" + meta.version;
                        if (packageSet.has(packageIdentifier)) {
                            return [3 /*break*/, 4];
                        }
                        if (this.options.excludedPackageTest(meta.name, meta.version)) {
                            return [3 /*break*/, 4];
                        }
                        packageSet.add(packageIdentifier);
                        license = this.licenseIdentifier.identifyLicense(meta, this.options);
                        return [4 /*yield*/, this.licenseTextReader.readLicenseText(meta, license, moduleDir)];
                    case 3:
                        licenseText = _b.sent();
                        result.push({
                            name: meta.name,
                            version: meta.version,
                            author: this.getAuthor(meta),
                            repository: this.getRepository(meta),
                            source: get_npm_tarball_url_1.default(meta.name, meta.version),
                            license: license,
                            licenseText: licenseText,
                        });
                        _b.label = 4;
                    case 4:
                        sortedModuleDirs_1_1 = sortedModuleDirs_1.next();
                        return [3 /*break*/, 2];
                    case 5: return [3 /*break*/, 8];
                    case 6:
                        e_1_1 = _b.sent();
                        e_1 = { error: e_1_1 };
                        return [3 /*break*/, 8];
                    case 7:
                        try {
                            if (sortedModuleDirs_1_1 && !sortedModuleDirs_1_1.done && (_a = sortedModuleDirs_1.return)) _a.call(sortedModuleDirs_1);
                        }
                        finally { if (e_1) throw e_1.error; }
                        return [7 /*endfinally*/];
                    case 8: return [2 /*return*/, result];
                }
            });
        });
    };
    LicenseMetaAggregator.prototype.getAuthor = function (meta) {
        return typeof meta.author === 'object'
            ? "" + meta.author.name + (meta.author.email ? " <" + meta.author.email + ">" : '') + (meta.author.url ? " (" + meta.author.url + ")" : '')
            : meta.author;
    };
    LicenseMetaAggregator.prototype.getRepository = function (meta) {
        if (meta.repository && meta.repository.url) {
            return meta.repository.url
                .replace('git+ssh://git@', 'git://')
                .replace('git+https://github.com', 'https://github.com')
                .replace('git://github.com', 'https://github.com')
                .replace('git@github.com:', 'https://github.com/')
                .replace(/\.git$/, '');
        }
        return null;
    };
    return LicenseMetaAggregator;
}());
exports.default = LicenseMetaAggregator;
//# sourceMappingURL=LicenseMetaAggregator.js.map
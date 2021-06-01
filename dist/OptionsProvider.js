"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
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
// @ts-ignore
var validate = require("spdx-expression-validate");
var defaultOptions_1 = require("./defaultOptions");
var OptionsProvider = /** @class */ (function () {
    function OptionsProvider(alertAggregator) {
        this.alertAggregator = alertAggregator;
    }
    OptionsProvider.prototype.getOptions = function (inputOptions) {
        this.validateOptions(inputOptions);
        var options = __assign(__assign({}, defaultOptions_1.default), inputOptions);
        return options;
    };
    OptionsProvider.prototype.validateOptions = function (inputOptions) {
        var e_1, _a, e_2, _b;
        if (inputOptions.additionalFiles) {
            try {
                for (var _c = __values(Object.keys(inputOptions.additionalFiles)), _d = _c.next(); !_d.done; _d = _c.next()) {
                    var fileName = _d.value;
                    if (typeof inputOptions.additionalFiles[fileName] !== 'function') {
                        this.alertAggregator.addError("Invalid additionalFiles option: Value for key \"" + fileName + "\" is not a function!");
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
                }
                finally { if (e_1) throw e_1.error; }
            }
        }
        if (inputOptions.licenseOverrides) {
            try {
                for (var _e = __values(Object.keys(inputOptions.licenseOverrides)), _f = _e.next(); !_f.done; _f = _e.next()) {
                    var packageVersion = _f.value;
                    if (!validate(inputOptions.licenseOverrides[packageVersion])) {
                        this.alertAggregator.addError("Invalid licenseOverrides option: \"" + inputOptions.licenseOverrides[packageVersion] + "\" is not a valid SPDX expression!");
                    }
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
                }
                finally { if (e_2) throw e_2.error; }
            }
        }
        if (inputOptions.replenishDefaultLicenseTexts &&
            typeof inputOptions.replenishDefaultLicenseTexts !== 'boolean') {
            this.alertAggregator.addError("Invalid replenishDefaultLicenseTexts option: Not a boolean!");
        }
    };
    return OptionsProvider;
}());
exports.default = OptionsProvider;
//# sourceMappingURL=OptionsProvider.js.map
import IAlertAggregator from './types/IAlertAggregator';
import webpack = require('webpack');
export default class WebpackAlertAggregator implements IAlertAggregator {
    private readonly compilation;
    private errors;
    private warnings;
    constructor(compilation: webpack.Compilation);
    addError(message: string): void;
    addWarning(message: string): void;
    flushAlerts(prefix: string): void;
}

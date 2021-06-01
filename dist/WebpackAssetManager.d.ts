import webpack = require('webpack');
import IAssetManager from './types/IAssetManager';
export default class WebpackAssetManager implements IAssetManager {
    private compilation;
    constructor(compilation: webpack.Compilation);
    addFile(filename: string, contents: string): void;
}

import * as webpack from 'webpack';
import IPluginOptions from './types/IPluginOptions';
import IWebpackPlugin from './types/IWebpackPlugin';
/**
 * @todo "emit" vs "compilation" & "optimizeChunkAssets" hooks
 * @todo add banner to chunks? boolean option + banner formatter?
 * @todo override license text or license filename
 * @todo override for version ranges or *
 * @todo select output fields
 * @todo error on missing license text?
 * @todo preferred license types on ambiguity (licenses array or spdx expression)
 */
export default class WebpackLicensePlugin implements IWebpackPlugin {
    private pluginOptions;
    constructor(pluginOptions?: Partial<IPluginOptions>);
    apply(compiler: webpack.Compiler): void;
    private handleCompilation;
    handleProcessAssets(compiler: webpack.Compiler, compilation: webpack.Compilation): Promise<void>;
}

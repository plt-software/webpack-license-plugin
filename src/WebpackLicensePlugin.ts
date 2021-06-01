import * as webpack from 'webpack'
import LicenseFileWriter from './LicenseFileWriter'
import LicenseMetaAggregator from './LicenseMetaAggregator'
import ModuleDirectoryLocator from './ModuleDirectoryLocator'
import OptionsProvider from './OptionsProvider'
import PackageJsonReader from './PackageJsonReader'
import IPluginOptions from './types/IPluginOptions'
import IWebpackPlugin from './types/IWebpackPlugin'
import WebpackAlertAggregator from './WebpackAlertAggregator'
import WebpackAssetManager from './WebpackAssetManager'
import WebpackChunkIterator from './WebpackChunkIterator'
import WebpackFileSystem from './WebpackFileSystem'

const pluginName = 'WebpackLicensePlugin'

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
  constructor(private pluginOptions: Partial<IPluginOptions> = {}) {
  }

  public apply(compiler: webpack.Compiler) {
    if (typeof compiler.hooks !== 'undefined') {
      compiler.hooks.thisCompilation.tap(
        'webpack-license-plugin',
        this.handleCompilation.bind(this, compiler));
    }
  }

  private handleCompilation(
    compiler: webpack.Compiler, 
    compilation: webpack.Compilation
    ) {
          compilation.hooks.processAssets.tapPromise(
            {
              name: 'webpack-license-plugin',
              stage: compiler.webpack.Compilation.PROCESS_ASSETS_STAGE_ADDITIONAL,
            },
            this.handleProcessAssets.bind(this, compiler, compilation, null)
          );
  }

  public async handleProcessAssets(
    compiler: webpack.Compiler,
    compilation: webpack.Compilation,
  ) {
    const alertAggregator = new WebpackAlertAggregator(compilation)
    const optionsProvider = new OptionsProvider(alertAggregator)

    const options = optionsProvider.getOptions(this.pluginOptions)
    alertAggregator.flushAlerts(pluginName)


    const chunkIterator = new WebpackChunkIterator(compilation)
    const filenames = chunkIterator.iterateChunks(Array.from(compilation.chunks))

    const fileSystem = new WebpackFileSystem(compiler.inputFileSystem)
    const packageJsonReader = new PackageJsonReader(fileSystem)
    const licenseFileWriter = new LicenseFileWriter(
      new WebpackAssetManager(compilation),
      new ModuleDirectoryLocator(
        fileSystem,
        compiler.options.context,
        packageJsonReader
      ),
      new LicenseMetaAggregator(
        fileSystem,
        alertAggregator,
        options,
        packageJsonReader
      )
    )

    await licenseFileWriter.writeLicenseFiles(filenames, options)
    alertAggregator.flushAlerts(pluginName)
  }
}

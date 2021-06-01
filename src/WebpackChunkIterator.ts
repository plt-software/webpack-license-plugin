import * as webpack from 'webpack'
import { Compilation } from 'webpack'
import WebpackChunkModuleIterator from './WebpackChunkModuleIterator'
import WebpackModuleFileIterator from './WebpackModuleFileIterator'

export default class WebpackChunkIterator {
  private compilation: Compilation;

  constructor(
    compilation: Compilation,
    private moduleIterator: WebpackChunkModuleIterator = new WebpackChunkModuleIterator(),
    private fileIterator: WebpackModuleFileIterator = new WebpackModuleFileIterator()
  ) {
    this.compilation = compilation;
  }

  public iterateChunks(chunks: webpack.Chunk[]): string[] {
    const filenames = []

    for (const chunk of chunks) {
      this.moduleIterator.iterateModules(this.compilation, chunk, module => {
        this.fileIterator.iterateFiles(module, filename => {
          filenames.push(filename)
        })
      })
    }

    return filenames
  }
}

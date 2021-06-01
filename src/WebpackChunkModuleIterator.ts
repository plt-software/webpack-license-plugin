import * as webpack from 'webpack'
import { Compilation } from 'webpack'
import IWebpackChunkModule from './types/IWebpackChunkModule'

type Chunk = Partial<
  Pick<
    webpack.Chunk & {
      forEachModule?: (callback: (module: IWebpackChunkModule) => void) => void
      modules?: IWebpackChunkModule[]
    },
    'entryModule' | 'forEachModule' | 'modules' | 'modulesIterable'
  >
>

export default class WebpackChunkModuleIterator {
  public iterateModules(
    compilation: Compilation,
    chunk: Chunk,
    callback: (module: IWebpackChunkModule) => void
  ): void {
    compilation.chunkGraph.getChunkModules(chunk as any).forEach((module) => {
      callback(module);
    })
  }
}

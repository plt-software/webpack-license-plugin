import * as webpack from 'webpack';
import { Compilation } from 'webpack';
import WebpackChunkModuleIterator from './WebpackChunkModuleIterator';
import WebpackModuleFileIterator from './WebpackModuleFileIterator';
export default class WebpackChunkIterator {
    private moduleIterator;
    private fileIterator;
    private compilation;
    constructor(compilation: Compilation, moduleIterator?: WebpackChunkModuleIterator, fileIterator?: WebpackModuleFileIterator);
    iterateChunks(chunks: webpack.Chunk[]): string[];
}

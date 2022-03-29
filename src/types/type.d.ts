import { ModuleFormat } from 'rollup';

export interface Options {
  input: string;
  output?: string;
  libraryName?: string;
  terser?: boolean;
  babel?: boolean;
  uglify?: boolean;
  dropConsole?: boolean;
  dropDebugger?: boolean;
  module?: ModuleFormat;
  eval?: boolean;
  banner: string;
}

import Observer from '@/Observer/Observer';
import Path from 'path';

export default class Typescript extends Observer {
  update({ options, plugins }) {
    const isTs = Path.extname(options.input) === '.ts';
    // ts
    if (isTs) {
      const typescript = require('rollup-plugin-typescript2');
      plugins.push(
        typescript({
          // tsconfig:"tsconfig.webpack.json",
          tsconfigOverride: {
            compilerOptions: {
              declaration: false, // 输出时去除类型文件
              module: 'ESNext',
              target: 'ES6',
            },
          },
        }),
      );
    }
  }
}

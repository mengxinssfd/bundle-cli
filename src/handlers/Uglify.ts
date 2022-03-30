import Observer from '../Observer/Observer';
import { minify } from 'uglify-js';
const { uglify } = require('rollup-plugin-uglify');

export default class Uglify extends Observer {
  update({ options, plugins }) {
    // uglify-js 包含terser和部分babel的效果
    if (options.uglify) {
      plugins.push(
        uglify(
          {
            compress: {
              drop_console: options.dropConsole,
              drop_debugger: options.dropDebugger,
            },
          },
          minify,
        ),
      );
    }
  }
}

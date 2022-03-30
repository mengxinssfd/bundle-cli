import Observer from '../Observer/Observer';
import type { Options } from '../types/type';
import resolve from 'rollup-plugin-node-resolve';
import babel from '@rollup/plugin-babel';
import Path from 'path';
import Fs from 'fs';

export default class Babel extends Observer {
  private isExistBabelRc = false;
  private babelRcPathTo!: string;
  update({ options, plugins }) {
    if (options.babel) {
      const isTs = Path.extname(options.input) === '.ts';
      plugins.push(resolve());
      const extensions = ['.js'];
      if (isTs) {
        extensions.push('ts');
      }
      plugins.push(
        babel({
          extensions,
          exclude: 'node_modules/*',
          babelHelpers: 'bundled',
        }),
      );
      const fileDir = Path.dirname(options.input);
      const babelRcPathTo = Path.resolve(fileDir, '.babelrc');
      const isExistBabelRc = Fs.existsSync(babelRcPathTo);
      this.isExistBabelRc = isExistBabelRc;
      this.babelRcPathTo = babelRcPathTo;
      if (!isExistBabelRc) {
        const envPath = Path.resolve(__dirname, '../../node_modules/@babel/preset-env');
        // console.log("env path: ", envPath);
        const tpl = `{"presets": [["${envPath}", {"modules": false, "loose": true}]]}`;
        Fs.writeFileSync(babelRcPathTo, tpl.replace(/\\/g, '/'));
      }
    }
  }
  destroy(options: Options) {
    if (options.babel && !this.isExistBabelRc) {
      Fs.rmSync(this.babelRcPathTo);
    }
  }
}

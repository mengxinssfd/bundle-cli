import Observer from '../Observer/Observer';
import Path from 'path';
import Fs from 'fs';
import { formatDate } from '@mxssfd/ts-utils';
import { Options } from '../types/type';

export default class Default extends Observer {
  handleBanner(options: Options) {
    const date = new Date();
    options.banner =
      '/*!\n' +
      ` * ${options.libraryName}\n` +
      ` * Date: ${formatDate(date, 'yyyy-MM-dd hh:mm')}\n` +
      ` */\n`;
  }
  handleLibraryName(options: Options) {
    if (!options.libraryName) {
      options.libraryName = Path.basename(options.input).split('.')[0];
    }
  }
  handleOutput(options: Options) {
    // 默认输出文件名为输入文件名.min.js
    if (!options.output) {
      const fileDir = Path.dirname(options.input);
      options.output = Path.resolve(
        fileDir,
        Path.basename(options.input, Path.extname(options.input)) + '.min.js',
      );
      console.log('default output path: ', options.output);
    }
  }
  handleInput(options: Options) {
    if (!options.input || !Fs.existsSync(options.input)) {
      throw new Error(`entry: ${options.input} is not exists`);
    }
  }
  update({ options }) {
    this.handleInput(options);

    this.handleOutput(options);

    // libraryName默认为入口文件名
    this.handleLibraryName(options);

    this.handleBanner(options);
  }
}

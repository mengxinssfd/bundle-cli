import Observer from '../Observer/Observer';

export default class Eval extends Observer {

  update({ options, plugins }) {
    if (options.eval) {
      // plugin顺序是从0开始到最后
      plugins.push({
        name: '',
        renderChunk: (code: any) => {
          const packer = require('../../packer');
          return options.banner + packer.pack(code, true);
        },
      });
    }
  }
}

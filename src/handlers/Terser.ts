import Observer from '@/Observer/Observer';
import { terser } from 'rollup-plugin-terser';

export default class Terser extends Observer {
  update({options,plugins}) {
    // 压缩
    if (options.terser) {
      plugins.push(terser());
    }
  }
}

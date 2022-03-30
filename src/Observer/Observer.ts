import type { Options } from '../types/type';
import type { Plugin } from 'rollup';

export default abstract class Observer {
  abstract update({ options, plugins }: { options: Options; plugins: Plugin[] }): void;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars,@typescript-eslint/no-empty-function
  destroy(options: Options) {}
}

import { Options } from '../../src/types/type';
import { TestLoadPlugin } from './CommonLoadPlugin';
import Uglify from '../../src/handlers/Uglify';

describe('Uglify', () => {
  const options: Options = {
    input: '',
    output: '',
    module: 'umd',
    banner: '',
  };
  TestLoadPlugin({
    name: 'test Uglify load plugin',
    options,
    ConcreteObserver: Uglify,
    unloadOptions: { uglify: false },
    loadOptions: { uglify: true },
  });
});

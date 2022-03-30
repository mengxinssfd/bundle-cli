import { Options } from '../../src/types/type';
import { TestLoadPlugin } from './CommonLoadPlugin';
import Typescript from "../../src/handlers/Typescript";

describe('Typescript', () => {
  const options: Options = {
    input: '',
    output: '',
    module: 'umd',
    banner: '',
  };
  TestLoadPlugin({
    name: 'test Typescript load plugin',
    options,
    ConcreteObserver: Typescript,
    unloadOptions: {
      input: 'test.js',
    },
    loadOptions: { input: 'test/test.ts' },
  });
});

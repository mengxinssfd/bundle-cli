import { Options } from '@/types/type';
import { TestLoadPlugin } from './CommonLoadPlugin';
import Eval from "@/handlers/Eval";

describe('Eval', () => {
  const options: Options = {
    input: '',
    output: '',
    module: 'umd',
    banner: '',
  };
  TestLoadPlugin({
    name: 'test Eval load plugin',
    options,
    ConcreteObserver: Eval,
    unloadOptions: { eval: false },
    loadOptions: { eval: true },
  });
});

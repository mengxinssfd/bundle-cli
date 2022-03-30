import HandlerSubject from '../../src/Observer/HandlerSubject';
import { Options } from '../../src/types/type';
import Babel from '../../src/handlers/Babel';

describe('Babel', () => {
  const options: Options = {
    input: '',
    output: '',
    module: 'umd',
    banner: '',
  };
  test('不加载插件', () => {
    const subject = new HandlerSubject({ ...options, babel: false });
    subject.attach(new Babel());
    subject.notifyUpdate();
    const plugins = subject.getPlugins();
    expect(plugins.length).toBe(0);
  });
  test('加载插件', () => {
    const subject = new HandlerSubject({ ...options, babel: true });
    subject.attach(new Babel());
    subject.notifyUpdate();
    const plugins = subject.getPlugins();
    expect(plugins.length).toBe(2);
  });
});

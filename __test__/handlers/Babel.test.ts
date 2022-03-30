import HandlerSubject from '@/Observer/HandlerSubject';
import { Options } from '@/types/type';
import Babel from '@/handlers/Babel';

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

import HandlerSubject from '@/Observer/HandlerSubject';
import { Options } from '@/types/type';
import Observer from '@/Observer/Observer';

export function TestLoadPlugin({
  name,
  ConcreteObserver,
  options,
  loadOptions,
  unloadOptions,
}: {
  name: string;
  ConcreteObserver: { new (): Observer };
  options: Options;
  loadOptions: Partial<Options>;
  unloadOptions: Partial<Options>;
}) {
  describe(name, () => {
    test('不加载插件', () => {
      const subject = new HandlerSubject({ ...options, ...unloadOptions });
      subject.attach(new ConcreteObserver());
      subject.notifyUpdate();
      const plugins = subject.getPlugins();
      expect(plugins.length).toBe(0);
    });
    test('加载插件', () => {
      const subject = new HandlerSubject({ ...options, ...loadOptions });
      subject.attach(new ConcreteObserver());
      subject.notifyUpdate();
      const plugins = subject.getPlugins();
      expect(plugins.length).toBe(1);
    });
  });
}

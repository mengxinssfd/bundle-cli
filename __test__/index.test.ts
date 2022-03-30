import bundleStart from '../src/index';
import { Options } from '../src/types/type';
const Path = require('path');
const Fs = require('fs');

describe('bundleStart', () => {
  const inputPath = Path.resolve(__dirname, './assets/index.js');
  const commonOptions: Options = {
    input: inputPath,
    output: '',
    dropDebugger: false,
    dropConsole: false,
    libraryName: '',
    terser: false,
    babel: false,
    uglify: false,
    module: 'umd',
    eval: false,
    banner: '',
  };

  const base = bundleStart({ ...commonOptions }, true);
  test('base', async () => {
    const res = await base;

    const inputFileText = Fs.readFileSync(commonOptions.input);
    expect(res !== inputFileText).toBeTruthy();

    // 异步抛出异常测试不出来
    // expect(() => bundleStart({ ...commonOptions, input: '121331' }, true)).toThrowError();
  });
  test('判断是否生成了文件', async () => {
    await bundleStart({
      input: inputPath,
      output: '',
      dropDebugger: false,
      dropConsole: false,
      libraryName: '',
      terser: false,
      babel: false,
      uglify: false,
      module: 'umd',
      eval: false,
      banner: '',
    });
    const outputPath = inputPath.replace('.js', '.min.js');
    expect(Fs.existsSync(outputPath)).toBeTruthy();
    Fs.rmSync(outputPath);
  });

  describe('babel', () => {
    test('不使用babel', async () => {
      const res = await base;
      expect(res.match(/\bconst\b/g)?.length).toBe(6);
    });
    test('使用babel', async () => {
      const res = await bundleStart({ ...commonOptions, babel: true }, true);
      // console.log(res);
      expect(res.match(/\bconst\b/g)).toBe(null);
    });
  });
  test('eval', async () => {
    const res = await bundleStart({ ...commonOptions, eval: true }, true);
    expect(res.includes('eval(function(')).toBeTruthy();
  });
  // terser不会转换const，会保留banner, 保留箭头函数，会自动去掉debugger
  test('terser', async () => {
    const options = { ...commonOptions, terser: true };
    const res = await bundleStart(options, true);
    expect(res.replace(options.banner, '').startsWith('!function(')).toBeTruthy();
  });
  // uglify会转换const，会去掉banner，把babel的工作也做了
  describe('uglify', () => {
    test('不使用', async () => {
      const res = await base;
      expect(res).toBeTruthy();
    });
    test('使用', async () => {
      const options = { ...commonOptions, uglify: true };
      const res = await bundleStart(options, true);
      expect(res.startsWith('!function(e,n){"object"==typeof exports')).toBeTruthy();
      expect(res.includes('debugger')).toBeTruthy();
      expect(res.includes('console.log')).toBeTruthy();
    });
    test('dropConsole dropDebugger', async () => {
      const options = { ...commonOptions, uglify: true, dropConsole: true, dropDebugger: true };
      const res = await bundleStart(options, true);
      expect(res.includes('debugger')).toBeFalsy();
      expect(res.includes('console.log')).toBeFalsy();
    });
  });
  test('typescript', async () => {
    const inputPath = Path.resolve(__dirname, './assets/tsTest.ts');
    const res = await bundleStart({ ...commonOptions, input: inputPath, module: 'commonjs' }, true);
    // console.log(res);
    // inRange函数是tsUtils.ts里面的
    expect(res.includes('function inRange')).toBeTruthy();
    expect(res.includes('const')).toBeTruthy();
    expect(res.includes('factory();')).toBeFalsy();
  });
  test('typescript babel', async () => {
    const inputPath = Path.resolve(__dirname, './assets/tsTest.ts');
    const res = await bundleStart(
      { ...commonOptions, input: inputPath, module: '' as any, babel: true },
      true,
    );
    // console.log(res);
    expect(res.includes('const')).toBeFalsy();
  });
});

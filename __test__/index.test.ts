import bundleStart from '@/index';
import { Options } from '@/types/type';
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
  test('base', async () => {
    const res = await bundleStart({ ...commonOptions }, true);

    // console.log(res);

    expect(typeof res === 'string').toBeTruthy();

    // expect(res.match(/\bconst\b/)?.length).toBeGreaterThan(10);
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
      const res = await bundleStart({ ...commonOptions }, true);

      expect(res.match(/\bconst\b/g)?.length).toBe(5);
    });
    test('使用babel', async () => {
      const res = await bundleStart({ ...commonOptions, babel: true }, true);
      // console.log(res);
      expect(res.match(/\bconst\b/g)).toBe(null);
    });
  });

  test('typescript', async () => {
    const inputPath = Path.resolve(__dirname, './assets/tsTest.ts');
    const res = await bundleStart({ ...commonOptions, input: inputPath }, true);
    // console.log(res);
    // inRange函数是tsUtils.ts里面的
    expect(res.includes('function inRange')).toBeTruthy();
  });
});

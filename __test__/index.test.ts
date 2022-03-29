import bundleStart from '@/index';
const Path = require('path');
const Fs = require('fs');

test('bundleStart', async () => {
  const code = await bundleStart(
    {
      input: Path.resolve(__dirname, '../test/index.js'),
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
    },
    true,
  );
  console.log(code);
  Fs.rmSync(Path.resolve(__dirname, '../test/index.min.js'));
});

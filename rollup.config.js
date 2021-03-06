import babel from '@rollup/plugin-babel';
import {terser} from 'rollup-plugin-terser';
import resolve from 'rollup-plugin-node-resolve';

const libraryName = "tsUtils";

export default {
  input: 'test/index.js',  // 入口文件
  output: {
    name: libraryName, // umd 模式必须要有 name  此属性作为全局变量访问打包结果
    file: `test/index.min.js`,
    format: 'umd',
    sourcemap: false,
  },
  plugins: [
    resolve(),
    babel({
      extensions: [".js"],
      exclude: "node_modules/*",
      babelHelpers: "bundled",
    }),
    terser(), // 压缩
  ]
};

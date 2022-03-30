//const { compilerOptions } = require('./tsconfig.json');
//const { pathsToModuleNameMapper } = require('ts-jest');
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  collectCoverageFrom: [
    "src/**",
    "!**/packer/**",
    "!**/src/utils.ts",
    "!**/src/index.bin.ts",
    "!**/src/types/**",
    "!**/src/Observer/**",
  ],
  coverageThreshold: {
    global: {
      branches: 50,
      functions: 50,
      lines: 50,
      statements: 50,
    },
  },
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  // 配置jest使用tsconfig.json中的path; 注意 tsconfig.json中不能有注释
  // 参考 https://stackoverflow.com/questions/52860868/typescript-paths-not-resolving-when-running-jest
  //  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/' }),
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
};

module.exports = {
  env: {
    node: true,
    jest: true,
  },
  /* 优先级低于parse的语法解析配置 */
  parserOptions: {
//    parser: '@typescript-eslint/parser',
//    project: 'tsconfig.json',
    sourceType: 'module',
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended', // typescript-eslint推荐规则
    'prettier',
  ],
  rules: {
    // 缩进
    indent: ['error', 2, { SwitchCase: 1 }],
    // 禁止使用 var
    'no-var': 'error',
    // 使用结尾分号
    semi: 'off',
    // 优先使用 interface 而不是 type
    '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/ban-types': 'off',
    '@typescript-eslint/no-unused-vars': 'error',
    '@typescript-eslint/no-var-requires':'off',
    '@typescript-eslint/no-empty-function': ['error', { allow: ['constructors'] }], // 允许空构造器
  },
};

// import { parseCmdParams as fn } from '@/utils';
import { parseCmdParams as fn } from '@mxssfd/ts-utils';
test('parseCmdParams', () => {
  function pcp(value: string, prefix?: string, df?: string) {
    return Object.fromEntries(fn(value.split(' ').slice(2), prefix, df));
  }

  expect(pcp('node test.js test.js -a -b -c')).toEqual({
    default: 'test.js',
    a: true,
    b: true,
    c: true,
  });

  expect(pcp('node test.js test.js -a=123')).toEqual({ default: 'test.js', a: '123' });

  expect(pcp('node test.js test.js -a=123 333 555 -b 666 888 -c=1 -b=999')).toEqual({
    default: 'test.js',
    a: ['123', '333', '555'],
    b: ['666', '888', '999'],
    c: '1',
  });

  expect(pcp('node test.js test.js -a=123=333=444=555')).toEqual({
    default: 'test.js',
    a: '123=333=444=555',
  });

  expect(pcp('node test.js test.js -a= ')).toEqual({ default: 'test.js', a: true });

  expect(pcp('node test.js test.js -a= -b=123')).toEqual({ default: 'test.js', a: true, b: '123' });

  expect(pcp('node test.js test.js -a==123=333=444=555')).toEqual({
    default: 'test.js',
    a: '=123=333=444=555',
  });

  expect(pcp('node test.js test.js --a==123=333=444=555', '--', 'args')).toEqual({
    args: 'test.js',
    a: '=123=333=444=555',
  });
});

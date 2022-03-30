test('packer', () => {
  const packer = require('../packer/index');
  const res: string = packer.pack('111111111111', true);
  expect(res.startsWith('eval(function(')).toBeTruthy();
  expect(res.includes('111111111111')).toBeTruthy();
});

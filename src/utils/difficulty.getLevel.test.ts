import { getLevel } from './difficulty';

it('{ width: 3, height: 1 } の easy を指定すると maxEmptyCount 1 の Level を返す', () => {
  expect(
    getLevel({ blockSize: { width: 3, height: 1 }, difficulty: 'easy' })
      .maxEmptyCount,
  ).toBe(1);
});

it('{ width: 3, height: 3 } の hard を指定すると maxEmptyCount 9 の Level を返す', () => {
  expect(
    getLevel({ blockSize: { width: 3, height: 3 }, difficulty: 'hard' })
      .maxEmptyCount,
  ).toBe(9);
});

it('存在しない組み合わせを指定するとエラーをスローする', () => {
  expect(() =>
    getLevel({ blockSize: { width: 1, height: 3 }, difficulty: 'hard' }),
  ).toThrowError();
});

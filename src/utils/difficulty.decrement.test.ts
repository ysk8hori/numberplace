import { it, expect } from 'vitest';
import { decrement, increment } from './difficulty';

describe('decrement', () => {
  it('{ width: 3, height: 1 } の easy を指定すると easy の Level を返す', () => {
    expect(
      decrement({ blockSize: { width: 3, height: 1 }, difficulty: 'easy' })
        .difficulty,
    ).toEqual('easy');
  });
  it('{ width: 3, height: 1 } の normal を指定すると easy の Level を返す', () => {
    expect(
      decrement({ blockSize: { width: 3, height: 1 }, difficulty: 'normal' })
        .difficulty,
    ).toEqual('easy');
  });
  it('{ width: 3, height: 1 } の hard を指定すると normal の Level を返す', () => {
    expect(
      decrement({ blockSize: { width: 3, height: 1 }, difficulty: 'hard' })
        .difficulty,
    ).toEqual('normal');
  });
});
describe('increment', () => {
  it('{ width: 3, height: 1 } の easy を指定すると normal の Level を返す', () => {
    expect(
      increment({ blockSize: { width: 3, height: 1 }, difficulty: 'easy' })
        .difficulty,
    ).toEqual('normal');
  });
  it('{ width: 3, height: 1 } の normal を指定すると hard の Level を返す', () => {
    expect(
      increment({ blockSize: { width: 3, height: 1 }, difficulty: 'normal' })
        .difficulty,
    ).toEqual('hard');
  });
  it('{ width: 3, height: 1 } の hard を指定すると hard の Level を返す', () => {
    expect(
      increment({ blockSize: { width: 3, height: 1 }, difficulty: 'hard' })
        .difficulty,
    ).toEqual('hard');
  });
});

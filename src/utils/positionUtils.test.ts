import { describe, test, expect } from 'vitest';
import { moveX, moveY } from './positionUtils';

describe('moveX', () => {
  test('指定した数移動する', () => {
    expect(moveX({ pos: [2, 2], num: 1, size: 4 })).toEqual([3, 2]);
  });
  test('負の数も可能', () => {
    expect(moveX({ pos: [2, 2], num: -1, size: 4 })).toEqual([1, 2]);
  });
  test('右端まで行くとループする', () => {
    expect(moveX({ pos: [2, 2], num: 2, size: 4 })).toEqual([0, 2]);
    expect(moveX({ pos: [2, 2], num: 3, size: 4 })).toEqual([1, 2]);
    expect(moveX({ pos: [2, 2], num: 8, size: 4 })).toEqual([2, 2]);
  });
  test('左端まで行くとループする', () => {
    expect(moveX({ pos: [1, 2], num: -2, size: 4 })).toEqual([3, 2]);
    expect(moveX({ pos: [1, 2], num: -3, size: 4 })).toEqual([2, 2]);
    expect(moveX({ pos: [1, 2], num: -8, size: 4 })).toEqual([1, 2]);
  });
});

describe('moveY', () => {
  test('指定した数移動する', () => {
    expect(moveY({ pos: [2, 2], num: 1, size: 4 })).toEqual([2, 3]);
  });
  test('負の数も可能', () => {
    expect(moveY({ pos: [2, 2], num: -1, size: 4 })).toEqual([2, 1]);
  });
  test('下端まで行くとループする', () => {
    expect(moveY({ pos: [2, 2], num: 2, size: 4 })).toEqual([2, 0]);
    expect(moveY({ pos: [2, 2], num: 3, size: 4 })).toEqual([2, 1]);
    expect(moveY({ pos: [2, 2], num: 8, size: 4 })).toEqual([2, 2]);
  });
  test('上端まで行くとループする', () => {
    expect(moveY({ pos: [2, 1], num: -2, size: 4 })).toEqual([2, 3]);
    expect(moveY({ pos: [2, 1], num: -3, size: 4 })).toEqual([2, 2]);
    expect(moveY({ pos: [2, 1], num: -8, size: 4 })).toEqual([2, 1]);
  });
});

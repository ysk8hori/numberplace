import { it, expect } from 'vitest';
import { difficultyAdjustment } from './difficulty';
import { solved_3_3, puzzle_3_3, blockSize_3_3 } from './test-utils';
import { collectCellsByAnswer } from './utils';

it('9x9 の問題で難易度 hard を指定すると引数で渡した puzzle に変更がない状態で返却される', () => {
  const puzzle = difficultyAdjustment({
    puzzle: puzzle_3_3,
    solved: solved_3_3,
    difficulty: 'hard',
    blockSize: blockSize_3_3,
  });
  expect(puzzle).toEqual(puzzle_3_3);
  const map = collectCellsByAnswer(puzzle.cells);
  expect(map.get('1')?.length).toBe(1);
  expect(map.get('2')?.length).toBe(3);
  expect(map.get('3')?.length).toBe(4);
  expect(map.get('4')?.length).toBe(4);
  expect(map.get('5')?.length).toBe(undefined);
  expect(map.get('6')?.length).toBe(4);
  expect(map.get('7')?.length).toBe(4);
  expect(map.get('8')?.length).toBe(1);
  expect(map.get('9')?.length).toBe(3);
});
it('9x9 の問題で難易度 normal を指定すると、各数字が少なくとも 2 箇所ずつ埋められた問題が返却される', () => {
  const puzzle = difficultyAdjustment({
    puzzle: puzzle_3_3,
    solved: solved_3_3,
    difficulty: 'normal',
    blockSize: blockSize_3_3,
  });
  const map = collectCellsByAnswer(puzzle.cells);
  expect(map.get('1')?.length).toBe(2); // もともとは 1
  expect(map.get('2')?.length).toBe(3);
  expect(map.get('3')?.length).toBe(4);
  expect(map.get('4')?.length).toBe(4);
  expect(map.get('5')?.length).toBe(2); // もともとは undefined
  expect(map.get('6')?.length).toBe(4);
  expect(map.get('7')?.length).toBe(4);
  expect(map.get('8')?.length).toBe(2); // もともとは 1
  expect(map.get('9')?.length).toBe(3);
});
it('9x9 の問題で難易度 easy を指定すると、各数字が少なくとも 4 箇所ずつ埋められた問題が返却される', () => {
  const puzzle = difficultyAdjustment({
    puzzle: puzzle_3_3,
    solved: solved_3_3,
    difficulty: 'easy',
    blockSize: blockSize_3_3,
  });
  const map = collectCellsByAnswer(puzzle.cells);
  expect(map.get('1')?.length).toBe(4); // もともとは 1
  expect(map.get('2')?.length).toBe(4); // もともとは 3
  expect(map.get('3')?.length).toBe(4);
  expect(map.get('4')?.length).toBe(4);
  expect(map.get('5')?.length).toBe(4); // もともとは undefined
  expect(map.get('6')?.length).toBe(4);
  expect(map.get('7')?.length).toBe(4);
  expect(map.get('8')?.length).toBe(4); // もともとは 1
  expect(map.get('9')?.length).toBe(4); // もともとは 3
});

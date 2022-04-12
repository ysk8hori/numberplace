import { it, expect } from 'vitest';
import { difficultyAdjustment } from './difficulty';
import { corrected_3_3, puzzle_3_3 } from './test-utils';
import { collectCellsByAnswer } from './utils';

it('9x9 の問題で難易度 9 より大きい値を指定すると引数で渡した puzzle に変更がない状態で返却される', () => {
  const puzzle = difficultyAdjustment({
    puzzle: puzzle_3_3,
    corrected: corrected_3_3,
    difficulty: 10,
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
it('9x9 の問題で難易度 9 を指定すると引数で渡した puzzle に変更がない状態で返却される', () => {
  const puzzle = difficultyAdjustment({
    puzzle: puzzle_3_3,
    corrected: corrected_3_3,
    difficulty: 9,
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
it('難易度 8 を指定すると、各数字が少なくとも 1 箇所ずつ埋められた問題が返却される', () => {
  const puzzle = difficultyAdjustment({
    puzzle: puzzle_3_3,
    corrected: corrected_3_3,
    difficulty: 8,
  });
  const map = collectCellsByAnswer(puzzle.cells);
  expect(map.get('1')?.length).toBe(1);
  expect(map.get('2')?.length).toBe(3);
  expect(map.get('3')?.length).toBe(4);
  expect(map.get('4')?.length).toBe(4);
  expect(map.get('5')?.length).toBe(1); // もともとは undefined
  expect(map.get('6')?.length).toBe(4);
  expect(map.get('7')?.length).toBe(4);
  expect(map.get('8')?.length).toBe(1);
  expect(map.get('9')?.length).toBe(3);
});
it('難易度 7 を指定すると、各数字が少なくとも 2 箇所ずつ埋められた問題が返却される', () => {
  const puzzle = difficultyAdjustment({
    puzzle: puzzle_3_3,
    corrected: corrected_3_3,
    difficulty: 7,
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
it('難易度 1 を指定すると、各数字が 8 箇所ずつ埋められた問題が返却される', () => {
  const puzzle = difficultyAdjustment({
    puzzle: puzzle_3_3,
    corrected: corrected_3_3,
    difficulty: 1,
  });
  const map = collectCellsByAnswer(puzzle.cells);
  expect(map.get('1')?.length).toBe(8);
  expect(map.get('2')?.length).toBe(8);
  expect(map.get('3')?.length).toBe(8);
  expect(map.get('4')?.length).toBe(8);
  expect(map.get('5')?.length).toBe(8);
  expect(map.get('6')?.length).toBe(8);
  expect(map.get('7')?.length).toBe(8);
  expect(map.get('8')?.length).toBe(8);
  expect(map.get('9')?.length).toBe(8);
});
it('難易度 1 より小さい値を指定すると、各数字が 9 箇所ずつ埋められた問題が返却される', () => {
  const puzzle = difficultyAdjustment({
    puzzle: puzzle_3_3,
    corrected: corrected_3_3,
    difficulty: -1,
  });
  const map = collectCellsByAnswer(puzzle.cells);
  expect(map.get('1')?.length).toBe(9);
  expect(map.get('2')?.length).toBe(9);
  expect(map.get('3')?.length).toBe(9);
  expect(map.get('4')?.length).toBe(9);
  expect(map.get('5')?.length).toBe(9);
  expect(map.get('6')?.length).toBe(9);
  expect(map.get('7')?.length).toBe(9);
  expect(map.get('8')?.length).toBe(9);
  expect(map.get('9')?.length).toBe(9);
});

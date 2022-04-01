import { describe, it, expect } from 'vitest';
import { blockSize_2_2, puzzle_2_2 } from './test-utils';
import { MyGame } from './typeUtils';
import { findCompletedNumbers } from './utils';

describe('findCompletedNumbers', () => {
  it('登場回数が最大 ( width * height ) を超えた数字をリストアップする', () => {
    // ゲームをクローン
    const puzzle_2_2_inputed = JSON.parse(JSON.stringify(puzzle_2_2)) as MyGame;
    // この時点で 2 は 3 箇所に記入されている
    expect(
      puzzle_2_2_inputed.cells.filter(cell => cell.answer === '2'),
    ).toHaveLength(3);
    // なので completedNumbers に含まれていない
    expect(findCompletedNumbers(blockSize_2_2, puzzle_2_2_inputed)).toEqual([]);
    // 空欄の cells[0] に 2 を入力
    puzzle_2_2_inputed.cells[0].answer = '2';
    // 2 は 4 箇所に記入済みになった
    expect(
      puzzle_2_2_inputed.cells.filter(cell => cell.answer === '2'),
    ).toHaveLength(4);
    // なので completedNumbers に 2 が含まれる
    expect(findCompletedNumbers(blockSize_2_2, puzzle_2_2_inputed)).toEqual([
      '2',
    ]);

    // 続けて、さっき入力した cells[0] を 4 で上書き
    puzzle_2_2_inputed.cells[0].answer = '4';
    // 2 は 3 箇所に記入済みになった
    expect(
      puzzle_2_2_inputed.cells.filter(cell => cell.answer === '2'),
    ).toHaveLength(3);
    // 4 は 4 箇所に記入済みになった
    expect(
      puzzle_2_2_inputed.cells.filter(cell => cell.answer === '4'),
    ).toHaveLength(4);
    // なので completedNumbers は 4 のみになる
    expect(findCompletedNumbers(blockSize_2_2, puzzle_2_2_inputed)).toEqual([
      '4',
    ]);
  });
});

import { BlockSize } from '@ysk8hori/numberplace-generator';
import { isSamePos } from './positionUtils';
import { MyGame } from './typeUtils';
import { collectCellsByAnswer, shuffle } from './utils';

/**
 * パズルの難易度を変更する
 *
 * 与えられた puzzle より難しい状態にはならない
 *
 * @returns 与えられた puzzle とは別のインスタンスの MyGame。難易度調整済み。
 */
export function difficultyAdjustment({
  /** 難易度調整対象のパズル。本関数はこれをクローンして難易度調整したものをリターンする。 */
  puzzle,
  /** 難易度調整対象のパズルの解答 */
  corrected,
  /** 難易度。最小値は 1 とし、最大値は対象のパズルのサイズ（blockSize.width*blockSize.height）とする。  */
  difficulty,
}: {
  puzzle: MyGame;
  corrected: MyGame;
  difficulty: number;
}): MyGame {
  const newPuzzle = {
    cells: JSON.parse(JSON.stringify(puzzle.cells)) as MyGame['cells'],
  };
  const emptyCells = newPuzzle.cells.filter(cell => !cell.answer);
  const correctedEmptyCells = shuffle(
    (JSON.parse(JSON.stringify(corrected.cells)) as MyGame['cells']).filter(
      cell => emptyCells.some(empty => isSamePos(cell.pos, empty.pos)),
    ),
  );
  const correctedEmptyCellsMap = collectCellsByAnswer(correctedEmptyCells);
  for (const correctedEmptyCellsByNum of correctedEmptyCellsMap.values()) {
    while (
      !(correctedEmptyCellsByNum.length <= (difficulty < 0 ? 0 : difficulty))
    ) {
      const cell = correctedEmptyCellsByNum.pop()!;
      const emptyCell = emptyCells.find(emptyCell =>
        isSamePos(cell.pos, emptyCell.pos),
      )!;
      emptyCell.answer = cell.answer;
    }
  }
  return newPuzzle;
}

type DifficultyName = 'easy' | 'normal' | 'hard';

/**
 * 問題のレベル
 * @see utils/README.md
 */
type Level = {
  blockSize: BlockSize;
  difficultyName: DifficultyName;
  difficulty: number;
};

const levels: Level[] = [
  {
    blockSize: { width: 3, height: 1 },
    difficultyName: 'easy',
    difficulty: 1,
  },
  {
    blockSize: { width: 3, height: 1 },
    difficultyName: 'normal',
    difficulty: 2,
  },
  {
    blockSize: { width: 3, height: 1 },
    difficultyName: 'hard',
    difficulty: 3,
  },
  {
    blockSize: { width: 2, height: 2 },
    difficultyName: 'easy',
    difficulty: 2,
  },
  {
    blockSize: { width: 2, height: 2 },
    difficultyName: 'normal',
    difficulty: 3,
  },
  {
    blockSize: { width: 2, height: 2 },
    difficultyName: 'hard',
    difficulty: 4,
  },
  {
    blockSize: { width: 3, height: 2 },
    difficultyName: 'easy',
    difficulty: 2,
  },
  {
    blockSize: { width: 3, height: 2 },
    difficultyName: 'normal',
    difficulty: 4,
  },
  {
    blockSize: { width: 3, height: 2 },
    difficultyName: 'hard',
    difficulty: 6,
  },
  {
    blockSize: { width: 3, height: 3 },
    difficultyName: 'easy',
    difficulty: 5,
  },
  {
    blockSize: { width: 3, height: 3 },
    difficultyName: 'normal',
    difficulty: 7,
  },
  {
    blockSize: { width: 3, height: 3 },
    difficultyName: 'hard',
    difficulty: 9,
  },
];

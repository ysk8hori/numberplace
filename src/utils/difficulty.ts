import { BlockSize } from '@ysk8hori/numberplace-generator';
import { isSameBlockSize } from './blockUtils';
import { isSamePos } from './positionUtils';
import { MyGame } from './typeUtils';
import { collectCellsByAnswer, error, shuffle } from './utils';

export type Difficulty = 'easy' | 'normal' | 'hard';

/**
 * 問題のレベル
 * @see utils/README.md
 */
export type Level = {
  blockSize: BlockSize;
  difficulty: Difficulty;
  maxEmptyCount: number;
};

/**
 * パズルの難易度を変更する
 *
 * 与えられた puzzle より難しい状態にはならない
 *
 * @returns 与えられた puzzle とは別のインスタンスの MyGame。難易度調整済み。
 */
export function difficultyAdjustment({
  puzzle,
  corrected,
  difficulty,
  blockSize,
}: {
  /** 難易度調整対象のパズル。本関数はこれをクローンして難易度調整したものをリターンする。 */
  puzzle: MyGame;
  /** 難易度調整対象のパズルの解答 */
  corrected: MyGame;
  /** 難易度。最小値は 1 とし、最大値は対象のパズルのサイズ（blockSize.width*blockSize.height）とする。  */
  difficulty: Difficulty;
  blockSize: BlockSize;
}): MyGame {
  const maxEmptyCount = getLevel({ blockSize, difficulty }).maxEmptyCount;
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
      !(
        correctedEmptyCellsByNum.length <=
        (maxEmptyCount < 0 ? 0 : maxEmptyCount)
      )
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

export function getLevel({
  blockSize,
  difficulty,
}: {
  blockSize: BlockSize;
  difficulty: Difficulty;
}): Level {
  return (
    levels.find(
      level =>
        isSameBlockSize(level.blockSize, blockSize) &&
        level.difficulty === difficulty,
    ) ?? error('未定義の BlockSize と Difficulty です。')
  );
}

export function decrement(current: {
  difficulty: Difficulty;
  blockSize: BlockSize;
}): Level {
  const currentLevel = getLevel(current);
  const myLevels = levels
    .filter(level => isSameBlockSize(level.blockSize, current.blockSize))
    .sort((a, b) => b.maxEmptyCount - a.maxEmptyCount);
  return (
    myLevels.find(level => level.maxEmptyCount < currentLevel.maxEmptyCount) ??
    currentLevel
  );
}
export function increment(current: {
  difficulty: Difficulty;
  blockSize: BlockSize;
}): Level {
  const currentLevel = getLevel(current);
  const myLevels = levels
    .filter(level => isSameBlockSize(level.blockSize, current.blockSize))
    .sort((a, b) => a.maxEmptyCount - b.maxEmptyCount);
  return (
    myLevels.find(level => currentLevel.maxEmptyCount < level.maxEmptyCount) ??
    currentLevel
  );
}

const levels: Level[] = [
  {
    blockSize: { width: 3, height: 1 },
    difficulty: 'easy',
    maxEmptyCount: 1,
  },
  {
    blockSize: { width: 3, height: 1 },
    difficulty: 'normal',
    maxEmptyCount: 2,
  },
  {
    blockSize: { width: 3, height: 1 },
    difficulty: 'hard',
    maxEmptyCount: 3,
  },
  {
    blockSize: { width: 2, height: 2 },
    difficulty: 'easy',
    maxEmptyCount: 1,
  },
  {
    blockSize: { width: 2, height: 2 },
    difficulty: 'normal',
    maxEmptyCount: 2,
  },
  {
    blockSize: { width: 2, height: 2 },
    difficulty: 'hard',
    maxEmptyCount: 4,
  },
  {
    blockSize: { width: 3, height: 2 },
    difficulty: 'easy',
    maxEmptyCount: 2,
  },
  {
    blockSize: { width: 3, height: 2 },
    difficulty: 'normal',
    maxEmptyCount: 4,
  },
  {
    blockSize: { width: 3, height: 2 },
    difficulty: 'hard',
    maxEmptyCount: 6,
  },
  {
    blockSize: { width: 3, height: 3 },
    difficulty: 'easy',
    maxEmptyCount: 5,
  },
  {
    blockSize: { width: 3, height: 3 },
    difficulty: 'normal',
    maxEmptyCount: 7,
  },
  {
    blockSize: { width: 3, height: 3 },
    difficulty: 'hard',
    maxEmptyCount: 9,
  },
  {
    blockSize: { width: 4, height: 3 },
    difficulty: 'easy',
    maxEmptyCount: 6,
  },
  {
    blockSize: { width: 4, height: 3 },
    difficulty: 'normal',
    maxEmptyCount: 9,
  },
  {
    blockSize: { width: 4, height: 3 },
    difficulty: 'hard',
    maxEmptyCount: 12,
  },
  {
    blockSize: { width: 4, height: 4 },
    difficulty: 'easy',
    maxEmptyCount: 10,
  },
  {
    blockSize: { width: 4, height: 4 },
    difficulty: 'normal',
    maxEmptyCount: 13,
  },
  {
    blockSize: { width: 4, height: 4 },
    difficulty: 'hard',
    maxEmptyCount: 16,
  },
];

import { BlockSize, generateGame } from '@ysk8hori/numberplace-generator';
import { difficultyAdjustment } from './utils/difficulty';
import { markFixed } from './utils/utils';

onmessage = ev => {
  const { blockSize, difficulty } = ev.data as {
    blockSize: BlockSize;
    difficulty: number;
  };
  const [tempPuzzle, corrected] = generateGame(blockSize);
  const puzzle = difficultyAdjustment({
    puzzle: tempPuzzle,
    corrected,
    difficulty,
  });
  markFixed(puzzle);
  // 関数を含んでいるとエラーとなるので関数を除外している
  postMessage({
    // puzzle: { cells: puzzle.cells },
    puzzle: puzzle,
    corrected: { cells: corrected.cells },
  });
};

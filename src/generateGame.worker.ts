import {
  BlockSize,
  GameType,
  generateGame,
} from '@ysk8hori/numberplace-generator';
import { Difficulty, difficultyAdjustment } from './utils/difficulty';
import { markFixed } from './utils/utils';

onmessage = ev => {
  const { blockSize, difficulty, cross, hyper } = ev.data as {
    blockSize: BlockSize;
    difficulty: Difficulty;
    cross: boolean | undefined;
    hyper: boolean | undefined;
  };
  const gameTypes: GameType[] = [];
  if (cross) gameTypes.push('cross');
  if (hyper) gameTypes.push('hyper');
  const [tempPuzzle, solved] = generateGame(blockSize, { gameTypes });
  const puzzle = difficultyAdjustment({
    puzzle: tempPuzzle,
    solved,
    difficulty,
    blockSize,
  });
  markFixed(puzzle);
  postMessage({
    puzzle: puzzle,
    solved: { cells: solved.cells },
  });
};

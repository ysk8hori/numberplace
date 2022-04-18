import {
  BlockSize,
  GameType,
  generateGame,
} from '@ysk8hori/numberplace-generator';
import { Difficulty, difficultyAdjustment } from './utils/difficulty';
import { markFixed } from './utils/utils';

onmessage = ev => {
  const { blockSize, difficulty, cross } = ev.data as {
    blockSize: BlockSize;
    difficulty: Difficulty;
    cross: boolean | undefined;
  };
  const gameTypes: GameType[] = [cross ? 'cross' : 'standard'];
  const [tempPuzzle, corrected] = generateGame(blockSize, { gameTypes });
  const puzzle = difficultyAdjustment({
    puzzle: tempPuzzle,
    corrected,
    difficulty,
    blockSize,
  });
  markFixed(puzzle);
  postMessage({
    puzzle: puzzle,
    corrected: { cells: corrected.cells },
  });
};

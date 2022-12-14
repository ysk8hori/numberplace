import {
  BlockSize,
  GameType,
  generateGame,
} from '@ysk8hori/numberplace-generator';
import { Difficulty, difficultyAdjustment } from '../../../utils/difficulty';
import { MyGame } from '../../../utils/typeUtils';
import { toURLSearchParam } from '../../../utils/URLSearchParamConverter';
import { markFixed } from '../../../utils/utils';

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
  const params = toURLSearchParam({
    puzzle,
    blockSize,
    cross,
    hyper,
  });
  console.log(`/?${params.toString()}`);
  const result: Result = {
    puzzle: puzzle,
    solved: { cells: solved.cells },
  };
  postMessage(result);
};

export type Result = { puzzle: MyGame; solved: MyGame; isGenerating?: false };

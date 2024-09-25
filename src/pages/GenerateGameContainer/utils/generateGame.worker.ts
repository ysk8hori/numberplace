import { BlockSize, generateGame } from '@ysk8/numberplace-generator';
import {
  GameType,
  generateGame as generateGameOld,
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
  console.log(gameTypes);
  const [tempPuzzle, solved] = (
    gameTypes.includes('hyper') && gameTypes.length === 1
      ? // gameType が hyper のみの場合のみ新しい generateGame を使う。 generator は v4.0.0-alpha.10 時点では hyper のみがv3より早い。
        generateGame
      : generateGameOld
  )(blockSize, { gameTypes });
  console.log(tempPuzzle.toString());
  console.log(solved.toString());
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

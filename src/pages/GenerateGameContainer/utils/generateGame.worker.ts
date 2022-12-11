import {
  BlockSize,
  GameType,
  generateGame,
} from '@ysk8hori/numberplace-generator';
import { Difficulty, difficultyAdjustment } from '../../../utils/difficulty';
import {
  puzzleToString,
  toURLSearchParam,
} from '../../../utils/URLSearchParamConverter';
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
  console.log(
    encodeURI(
      puzzleToString({
        puzzle: tempPuzzle,
        rowSplitter: 'n',
        colSplitter: '',
        empty: 'x',
      }),
    ),
  );
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
  console.log(`http://localhost:3000/?${params.toString()}`);
  console.log(`https://numberp.net/?${params.toString()}`);
  postMessage({
    puzzle: puzzle,
    solved: { cells: solved.cells },
  });
};

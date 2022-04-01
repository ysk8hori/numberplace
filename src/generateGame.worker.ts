import { generateGame } from '@ysk8hori/numberplace-generator';
import { markFixed } from './utils/utils';

onmessage = ev => {
  const [puzzle, corrected] = generateGame(ev.data);
  markFixed(puzzle);
  // 関数を含んでいるとエラーとなるので関数を除外している
  postMessage({
    puzzle: { cells: puzzle.cells },
    corrected: { cells: corrected.cells },
  });
};

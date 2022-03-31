import { generateGame } from '@ysk8hori/numberplace-generator';

onmessage = ev => {
  const [puzzle, corrected] = generateGame(ev.data);
  // 関数を含んでいるとエラーとなるので関数を除外している
  postMessage({
    puzzle: { cells: puzzle.cells },
    corrected: { cells: corrected.cells },
  });
};

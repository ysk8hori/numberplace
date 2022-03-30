import { generateGame } from '@ysk8hori/numberplace-generator';

onmessage = ev => {
  const [puzzle, correct] = generateGame(ev.data);
  // 関数を含んでいるとエラーとなるので関数を除外する
  postMessage([{ cells: puzzle.cells }, { cells: correct.cells }]);
};

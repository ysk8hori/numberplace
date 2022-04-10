import { Game, generateGame } from '@ysk8hori/numberplace-generator';
import { isSamePos } from './utils/positionUtils';
import { MyCell, MyGame } from './utils/typeUtils';
import { markFixed } from './utils/utils';

onmessage = ev => {
  const [tempPuzzle, corrected] = generateGame(ev.data);
  const puzzle = hoge({ puzzle: tempPuzzle, corrected });
  markFixed(puzzle);
  // 関数を含んでいるとエラーとなるので関数を除外している
  postMessage({
    // puzzle: { cells: puzzle.cells },
    puzzle: puzzle,
    corrected: { cells: corrected.cells },
  });
};

function hoge({
  puzzle,
  corrected,
}: {
  puzzle: Game;
  corrected: Game;
}): MyGame {
  const newPuzzle = {
    cells: JSON.parse(JSON.stringify(puzzle.cells)) as MyGame['cells'],
  };
  const emptyCells = newPuzzle.cells.filter(cell => !cell.answer);
  const correctedEmptyCells = corrected.cells.filter(cell =>
    emptyCells.some(empty => isSamePos(cell.pos, empty.pos)),
  );
  const correctedEmptyCellsByNum = correctedEmptyCells.reduce((map, cell) => {
    if (!map.has(cell.answer!)) {
      map.set(cell.answer!, []);
    }
    map.get(cell.answer!)?.push(cell);
    return map;
  }, new Map<string, MyCell[]>());
  for (const correctedEmptyCells of correctedEmptyCellsByNum.values()) {
    if (6 < correctedEmptyCells.length) {
      const correctedEmptyCell =
        correctedEmptyCells[
          Math.floor(Math.random() * correctedEmptyCells.length)
        ];
      const emptyCell = emptyCells.find(emptyCell =>
        isSamePos(correctedEmptyCell.pos, emptyCell.pos),
      )!;
      emptyCell.answer = correctedEmptyCell.answer;
    }
  }
  return newPuzzle;
}

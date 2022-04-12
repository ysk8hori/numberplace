import { BlockSize } from '@ysk8hori/numberplace-generator';
import { MyCell, MyGame } from './typeUtils';

export function exists<T>(t: T | undefined): t is T {
  return t !== undefined;
}

/** 入力済みの数字を見つけリストにする */
export function findCompletedNumbers(
  blockSize: BlockSize,
  puzzle: MyGame,
): string[] {
  return Array(blockSize.height * blockSize.width)
    .fill(0)
    .map((_, index) => (++index).toString())
    .map(numStr =>
      puzzle.cells.map(cell => cell.answer).filter(answer => answer === numStr)
        .length >=
      blockSize.height * blockSize.width
        ? numStr
        : undefined,
    )
    .filter(exists);
}

export function markFixed(puzzle: MyGame) {
  (puzzle as MyGame).cells
    .filter(cell => cell.answer)
    .forEach(cell => (cell.isFix = true));
  return puzzle;
}

export function shuffle<T>(array: T[]): T[] {
  for (let i = array.length - 1; 0 < i; i--) {
    const r = Math.floor(Math.random() * (i + 1));
    const tmp = array[i];
    array[i] = array[r];
    array[r] = tmp;
  }
  return array;
}

export function collectCellsByAnswer(
  correctedEmptyCells: MyCell[],
): Map<string, MyCell[]> {
  return correctedEmptyCells.reduce((map, cell) => {
    if (!map.has(cell.answer!)) {
      map.set(cell.answer!, []);
    }
    map.get(cell.answer!)?.push(cell);
    return map;
  }, new Map<string, MyCell[]>());
}

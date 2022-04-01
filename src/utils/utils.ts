import { BlockSize } from '@ysk8hori/numberplace-generator';
import { MyGame } from './typeUtils';

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

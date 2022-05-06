import { BlockSize, Cell } from '@ysk8hori/numberplace-generator';
import { Result } from './Result';
import { MyGame } from './typeUtils';

export function toParam({
  puzzle,
  blockSize,
  cross,
  hyper,
}: {
  puzzle: MyGame;
  blockSize: BlockSize;
  cross?: boolean;
  hyper?: boolean;
}) {
  // ざっくりとした version 情報も載せる
}

/**
 * puzzle を文字列に変換する。URL エンコードはしない。
 *
 * ## 変換ルール
 *
 * セルに記入されている答えを羅列した文字列を生成する。
 *
 * - 各セルの答えと答えの間には colSplitter に指定されている文字を記入する
 * - 改行時には rowSplitter に指定されている文字を記入する
 * - answer の値がからの場合は empty の値を使用する
 * - answer の値がある場合は16進数文字列にする。
 *   - 現状、16以上の数字は本アプリでは使用しない。
 *   - 16は0に変換する。
 * - 空欄の後に改行する場合、その空欄は省略する。
 *
 */
export function puzzleToString({
  puzzle,
  rowSplitter = '|',
  colSplitter = '',
  empty = ' ',
}: {
  puzzle: Pick<MyGame, 'cells'>;
  rowSplitter?: string;
  colSplitter?: string;
  empty?: string;
}) {
  const horizontalLines: Map<number, Cell[]> = puzzle.cells.reduce(
    (p, cell) => {
      const lineNo = cell.pos[1];
      if (!p.has(lineNo)) p.set(lineNo, new Array<Cell>());
      p.get(lineNo)?.push(cell);
      return p;
    },
    new Map<number, Cell[]>(),
  );
  return Array.from(horizontalLines.values())
    .map(line =>
      // 行が変わる前の空欄を省略するためのロジック
      line
        // 1行を対象とし、後ろのカラムから配列にプッシュするが、後ろのカラムが空欄の場合はプッシュせず省略する。空欄でないカラムが出現してからは省略しない。
        .reduceRight((arr, cell) => {
          if (arr.length === 0 && !cell.answer) return arr;
          arr.push(cell.answer ?? empty);
          return arr;
        }, new Array<string>())
        // 後ろのカラムから追加して逆になっていた順序を元に戻す
        .reverse()
        .map(answer => {
          // 16進数文字にする。16は0にする。
          const num = parseInt(answer, 10);
          if (isNaN(num)) return answer;
          if (num === 16) return '0';
          return num.toString(16);
        })
        .join(colSplitter),
    )
    .join(rowSplitter);
}

type FailureStatus = 'invalid_size' | 'not_implemented';

export function stringToPuzzle({
  puzzleStr,
  rowSplitter = '|',
  colSplitter = '',
  empty = ' ',
}: {
  puzzleStr: string;
  rowSplitter?: string;
  colSplitter?: string;
  empty?: string;
}): Result<FailureStatus> {
  const size = puzzleStr.split(rowSplitter);
  if (size.length < 4 || 16 < size.length) {
    return Result.create('invalid_size');
  }
  return Result.create('not_implemented');
}

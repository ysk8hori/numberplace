import { BlockSize, Cell } from '@ysk8hori/numberplace-generator';
import { isSamePos } from './positionUtils';
import { Result } from './Result';
import { MyGame } from './typeUtils';

type PuzzleInfo = {
  puzzle: Pick<MyGame, 'cells'>;
  blockSize: BlockSize;
  cross?: boolean;
  hyper?: boolean;
};

const SPLITTER = { colSplitter: '', rowSplitter: 'n', empty: 'x' };

export function toURLSearchParam({
  puzzle,
  blockSize,
  cross,
  hyper,
}: PuzzleInfo) {
  const param: Record<string, string> = {};
  // ざっくりとした version 情報も一応載せる
  param.v = '1';
  param.p = puzzleToString({
    puzzle,
    ...SPLITTER,
  });
  param.w = blockSize.width.toString();
  param.h = blockSize.height.toString();
  if (cross || hyper) param.t = (cross ? 'c' : '') + (hyper ? 'h' : '');
  return new URLSearchParams(param);
}

type FromURLSearchParamsFailureStatus =
  | 'not_implemented'
  | 'invalid_size'
  | 'invalid_answer'
  | 'invalid_puzzle';

export function fromURLSearchParams(
  param: URLSearchParams,
): Result<FromURLSearchParamsFailureStatus> | Result<'success', PuzzleInfo> {
  const widthStr = param.get('w');
  const heightStr = param.get('h');
  if (widthStr === null || heightStr === null) {
    return Result.create('invalid_size');
  }
  const width = parseFloat(widthStr);
  const height = parseFloat(heightStr);
  if (
    isNaN(width) ||
    isNaN(height) ||
    !Number.isInteger(width) ||
    !Number.isInteger(height) ||
    width <= 0 ||
    height <= 0 ||
    width * height < 3 ||
    16 < width * height
  ) {
    return Result.create('invalid_size');
  }

  // version は特に使用していない。今後、URLパラメータの仕様を変更したくなった際には使用する。
  // const version = param.get('v');

  const typesStr = param.get('t');
  const cross = typesStr?.includes('c');
  const hyper = typesStr?.includes('h');

  const puzzleStr = param.get('p');
  if (!puzzleStr) return Result.create('invalid_puzzle');
  const result = stringToPuzzle({ puzzleStr, ...SPLITTER });
  if (result.status !== 'success') {
    return Result.create('invalid_puzzle');
  }
  return Result.create('success', {
    puzzle: result.data,
    blockSize: { width, height },
    cross,
    hyper,
  });
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

type StringToPuzzleFailureStatus =
  | 'invalid_size'
  | 'not_implemented'
  | 'invalid_answer';

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
}):
  | Result<StringToPuzzleFailureStatus>
  | Result<
      'success',
      {
        cells: Cell[];
      }
    > {
  const rowsStr = puzzleStr.split(rowSplitter);
  if (rowsStr.length < 4 || 16 < rowsStr.length) {
    return Result.create('invalid_size');
  }
  /** 注：rowsAnswers での answer はまだ16進の文字 */
  const rowsAnswers = rowsStr.map(rowStr => rowStr.split(colSplitter));
  if (
    !rowsAnswers.every(answers =>
      answers.every(a => a === empty || !isNaN(parseInt(a, 16))),
    )
  ) {
    return Result.create('invalid_answer');
  }
  if (rowsAnswers.some(answers => rowsAnswers.length < answers.length)) {
    // 行の数を超える列数がある場合は不正なサイズ
    return Result.create('invalid_size');
  }
  // 全てのセルを作る
  const cells = Array(rowsStr.length)
    .fill(0)
    .map((_, y) =>
      Array(rowsStr.length)
        .fill(0)
        .map((_, x) => {
          const cell: Cell = {
            pos: [x, y],
            answer: undefined,
          };
          return cell;
        }),
    )
    .flat();
  // セルに答えを転写する
  rowsAnswers.forEach((answers, y) =>
    answers.forEach((a, x) => {
      let answer = a === empty ? undefined : parseInt(a, 16);
      if (answer === 0) answer = 16;
      cells.find(cell => isSamePos(cell.pos, [x, y]))!.answer =
        answer?.toString();
    }),
  );

  return Result.create('success', { cells });
}

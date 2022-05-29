import { BlockSize } from '@ysk8hori/numberplace-generator';
import clsx from 'clsx';
import React, { useMemo } from 'react';
import { getSvg } from '../utils/numberUtils';

export type Props = React.ComponentProps<'div'> & {
  memoList?: string[];
  /** blockSize は基本的には省略不可だが Cell の既存のテストケースなどに配慮して省略可能とする */
  blockSize?: BlockSize;
};

function MemoCell({
  answerCandidate,
  memoList,
}: {
  answerCandidate: string;
  memoList?: string[];
}) {
  const numberImage = useMemo(
    () => getSvg({ answer: answerCandidate }),
    [answerCandidate],
  );
  const display = useMemo(
    () => memoList?.includes(answerCandidate),
    [memoList, answerCandidate],
  );
  return (
    <div className="aspect-square">
      {display && (
        <img
          src={numberImage}
          alt={`answer candidate ${answerCandidate}`}
          className="select-none"
          style={{ width: '80%', height: '80%' }}
        ></img>
      )}
    </div>
  );
}

/**
 * 答えの候補のメモを表示するレイヤー。
 * Cell のレイヤーの一つとして Cell 中で使用する。
 *
 * - セルの大きさに合わせたフォントのサイズで表示する
 * - memoList に含まれる数のみを表示する
 */
export default function MemoLayer({
  memoList,
  blockSize = { width: 3, height: 3 },
  ...rest
}: Props) {
  const className = useMemo(
    () =>
      clsx(
        'aspect-square',
        'max-w-screen-sm',
        'max-h-screen',
        'grid',
        'items-center',
        generateGridColsClass(blockSize),
        'relative',
        'select-none',
      ),
    [blockSize],
  );
  const Memos = useMemo(
    () =>
      Array(blockSize.width * blockSize.height)
        .fill(0)
        .map((_, i) => (++i).toString())
        .map(answerCandidate => {
          return (
            <MemoCell
              key={answerCandidate}
              answerCandidate={answerCandidate}
              memoList={memoList}
            />
          );
        }),
    [blockSize, memoList],
  );
  return (
    <div className={className} {...rest}>
      {Memos}
    </div>
  );
}

/**
 * gird-cols-n の tailwind クラスを決定する。
 *
 * @param BlockSize
 * @returns gird-cols-n の tailwind クラス
 */
function generateGridColsClass({ width }: BlockSize) {
  return `grid-cols-wrap-${width}`;
}

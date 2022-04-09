import { BlockSize } from '@ysk8hori/numberplace-generator';
import clsx from 'clsx';
import React, {
  useContext,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { FontFamilyContext } from '../../../contexts/fontContext';

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
  const box = useRef<HTMLDivElement>(null);
  const [fontSize, setFontSize] = useState('1rem');
  const [lineHeight, setLineHeight] = useState('1rem');
  const display = useMemo(
    () => memoList?.includes(answerCandidate),
    [memoList, answerCandidate],
  );
  const fontContext = useContext(FontFamilyContext);
  const fontFamily = fontContext.normal;
  useLayoutEffect(() => {
    if (box.current?.offsetWidth) {
      setFontSize(`${box.current.offsetWidth / 1.3}px`);
    }
  }, [box.current?.offsetWidth]);
  useLayoutEffect(() => {
    if (box.current?.offsetHeight) {
      setLineHeight(`${box.current.offsetHeight / 1.3}px`);
    }
  }, [box.current?.offsetHeight]);
  return (
    <div
      ref={box}
      style={{ fontFamily, fontSize, lineHeight }}
      className="aspect-square text-center"
    >
      {display && answerCandidate}
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

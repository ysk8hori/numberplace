import React, {
  PropsWithChildren,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

/**
 * マス目１つを表すコンポーネント。以下の特徴を持つ。
 *
 * - answer を真ん中に表示する
 * - 正方形
 * - セルの大きさに合わせたフォントのサイズで表示する
 * - セルを選んだ時、選んでいることがわかる
 *
 * 以下のことは行わない。
 *
 * - 自分のポジションを意識した処理
 */
export default function Cell({
  answer,
  right,
  bottom,
  select,
  ...rest
}: PropsWithChildren<{
  /** そのセルの答え。未回答ならば省略可。 */
  answer?: string;
  /** セルの右側のボーダーを太くする */
  right?: boolean;
  /** セルの下側のボーダーを太くする */
  bottom?: boolean;
  /** セルを選択中表示にする */
  select?: boolean;
}>) {
  const box = useRef<HTMLDivElement>(null);
  const [fontSize, setFontSize] = useState('1rem');
  const boxStyle = { fontSize };
  useLayoutEffect(() => {
    if (box.current?.offsetWidth) {
      setFontSize(`${box.current.offsetWidth / 2}px`);
    }
  });
  const className = useMemo(
    () =>
      [
        'box-border',
        'aspect-square',
        right ? 'border-r-2 border-r-black' : '',
        bottom ? 'border-b-2 border-b-black' : '',
        'relative',
      ].join(' '),
    [right, bottom],
  );
  const innerClassName = useMemo(
    () =>
      [
        'w-full',
        'h-full',
        'flex',
        'justify-center',
        'items-center',
        right ? '' : 'border-r-2',
        bottom ? '' : 'border-b-2',
      ].join(' '),
    [right, bottom],
  );
  return (
    <div ref={box} className={className} style={boxStyle} {...rest}>
      <div className={innerClassName}>{answer}</div>
      <SelectLayer select={select} />
    </div>
  );
}

const SelectLayer = ({
  select,
}: {
  /** セルを選択中表示にする */ select?: boolean;
}) => {
  return select ? (
    <div className="w-full h-full p-1 absolute top-0 left-0">
      <div className="w-full h-full border-4 rounded-lg border-pink-300"></div>
    </div>
  ) : null;
};

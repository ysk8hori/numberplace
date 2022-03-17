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
 */
export default function Cell({
  answer,
  right,
  ...rest
}: PropsWithChildren<{
  /** そのセルの答え。未回答ならば省略可。 */
  answer?: string;
  /** セルの右側のボーダーを太くする */
  right?: boolean;
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
        'border-solid',
        'border',
        'aspect-square',
        'flex',
        'justify-center',
        'items-center',
        right ? 'border-r-2 border-r-black' : '',
      ].join(' '),
    [right],
  );
  return (
    <div ref={box} className={className} style={boxStyle} {...rest}>
      {answer}
    </div>
  );
}

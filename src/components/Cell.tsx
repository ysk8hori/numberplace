import React, { useLayoutEffect, useRef, useState } from 'react';

/**
 * マス目１つを表すコンポーネント。以下の特徴を持つ。
 *
 * - answer を真ん中に表示する
 * - 正方形
 * - セルの大きさに合わせたフォントのサイズで表示する
 */
export default function Cell({
  answer,
}: {
  /** そのセルの答え。未回答ならば undefined */
  answer: string | undefined;
}) {
  const box = useRef<HTMLDivElement>(null);
  const [fontSize, setFontSize] = useState('1rem');
  const boxStyle = { fontSize };
  useLayoutEffect(() => {
    if (box.current?.offsetWidth) {
      setFontSize(`${box.current.offsetWidth / 2}px`);
    }
  });
  return (
    <div
      ref={box}
      className="box-border border-solid border aspect-square flex justify-center items-center"
      style={boxStyle}
    >
      {answer}
    </div>
  );
}

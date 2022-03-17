import React from 'react';

/**
 * マス目１つを表すコンポーネント。以下の特徴を持つ。
 *
 * - answer を真ん中に表示する
 * - 正方形
 * - 自分の大きさに合わせたフォントのサイズで表示する
 */
export default function Cell({
  answer,
}: {
  /** そのセルの答え。未回答ならば undefined */
  answer: string | undefined;
}) {
  return (
    <div className="box-border border-solid border aspect-square flex justify-center items-center">
      {answer}
    </div>
  );
}

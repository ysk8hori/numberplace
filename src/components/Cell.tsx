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
}: PropsWithChildren<
  {
    /** そのセルの答え。未回答ならば省略可。 */
    answer?: string;
  } & BorderLayerProps &
    SelectLayerProps
>) {
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
      className={'relative aspect-square flex justify-center items-center'}
      style={boxStyle}
      {...rest}
    >
      {answer}
      <BorderLayer right={right} bottom={bottom} />
      <SelectLayer select={select} />
    </div>
  );
}

type BorderLayerProps = {
  /** セルの右側のボーダーを太くする */ right?: boolean;
  /** セルの下側のボーダーを太くする */ bottom?: boolean;
};

/**
 * cell のボーダーを表示するレイヤー。
 *
 * 2段構造になっているのは、黒いボーダーと灰色のボーダーが交差する箇所で黒いボーダーを勝たせるため。
 * @see https://twitter.com/ysk8_/status/1504855146240811012?s=21
 */
const BorderLayer = ({ right, bottom }: BorderLayerProps) => {
  const className = useMemo(
    () =>
      [
        'w-full h-full',
        'absolute top-0 left-0',
        right ? 'border-r-2 border-r-black' : '',
        bottom ? 'border-b-2 border-b-black' : '',
      ].join(' '),
    [right, bottom],
  );
  const innerClassName = useMemo(
    () =>
      [
        'w-full h-full',
        right ? '' : 'border-r-2',
        bottom ? '' : 'border-b-2',
      ].join(' '),
    [right, bottom],
  );
  return (
    <div className={className}>
      <div className={innerClassName}></div>
    </div>
  );
};

type SelectLayerProps = {
  /** セルを選択中表示にする */ select?: boolean;
};

/**
 * セルが選択中であることを表現するレイヤー。
 */
const SelectLayer = ({ select }: SelectLayerProps) => {
  return select ? (
    <div className="w-full h-full p-1 absolute top-0 left-0">
      <div className="w-full h-full border-4 rounded-lg border-pink-300"></div>
    </div>
  ) : null;
};

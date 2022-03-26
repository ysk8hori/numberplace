import React, {
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { FontFamilyContext } from '../contexts/fontContext';

/**
 * マス目１つを表すコンポーネント。以下の特徴を持つ。
 *
 * - answer を真ん中に表示する
 * - 正方形
 * - セルの大きさに合わせたフォントのサイズで表示する
 * - セルを選んだ時、選んでいることがわかる
 * - クリックできる（結果的に選択状態となる想定）
 * - 選択中の Cell には data-select 属性が付く
 * - 変更できない Cell が見た目でわかる
 *
 * 以下のことは行わない。
 *
 * - 自分のポジションを意識した処理
 */
const Cell: React.FC<
  { onSelect?: () => void } & AnswerLayerProps &
    BorderLayerProps &
    SelectLayerProps
> = ({
  onSelect = () => undefined,
  answer,
  fix,
  right,
  bottom,
  select,
  ...rest
}: PropsWithChildren<
  { onSelect?: () => void } & AnswerLayerProps &
    BorderLayerProps &
    SelectLayerProps
>) => {
  return (
    <div
      className={'relative aspect-square select-none'}
      onClick={onSelect}
      data-select={select}
      {...rest}
    >
      <AnswerLayer answer={answer} fix={fix} />
      <BorderLayer right={right} bottom={bottom} />
      <SelectLayer select={select} />
    </div>
  );
};

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
const BorderLayer: React.FC<BorderLayerProps> = ({ right, bottom }) => {
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
const SelectLayer: React.FC<SelectLayerProps> = ({ select }) => {
  return select ? (
    <div className="w-full h-full p-1 absolute top-0 left-0">
      <div className="w-full h-full border-4 rounded-lg border-pink-300"></div>
    </div>
  ) : null;
};

type AnswerLayerProps = {
  /** そのセルの答え。未回答ならば省略可。 */
  answer?: string;
  /** 変更不可フラグ */
  fix?: boolean;
};

/**
 * 答えを表示するレイヤー。
 */
const AnswerLayer: React.FC<AnswerLayerProps> = ({ answer, fix }) => {
  const box = useRef<HTMLDivElement>(null);
  const [fontSize, setFontSize] = useState('1rem');
  const fontContext = useContext(FontFamilyContext);
  const fontFamily = useMemo(
    () => (fix ? fontContext.fixed : fontContext.normal),
    [fix],
  );
  useLayoutEffect(() => {
    if (box.current?.offsetWidth) {
      setFontSize(`${box.current.offsetWidth / 2}px`);
    }
  }, [box.current?.offsetWidth]);
  return (
    <span
      ref={box}
      className="w-full h-full flex justify-center items-center select-none"
      style={{ fontSize, fontFamily }}
    >
      {answer}
    </span>
  );
};

export default Cell;

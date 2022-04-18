import clsx from 'clsx';
import React, {
  PropsWithChildren,
  useContext,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { FontFamilyContext } from '../../../contexts/fontContext';
import MemoLayer, { Props as MemoLayerProps } from './MemoLayer';

/**
 * マス目１つを表すコンポーネント。以下の特徴を持つ。
 *
 * - answer を真ん中に表示する
 * - 正方形
 * - セルの大きさに合わせたフォントのサイズで表示する
 * - セルを選んだ時、選んでいることがわかる
 * - クリックできる（結果的に選択状態となる想定）
 * - 選択中の Cell が見た目でわかる
 * - 変更できない Cell が見た目でわかる
 * - answer がない場合はメモレイヤーを表示する
 *   - メモがある場合はメモを表示する
 * - 特殊なグループに属する場合はグレーを濃くする
 *   - upleft-downright
 *   - upright-downleft
 *
 * 以下のことは行わない。
 *
 * - 自分のポジションを意識した処理
 */
function Cell({
  onSelect = () => undefined,
  answer,
  fix,
  right,
  bottom,
  select,
  blockSize,
  memoList,
  'data-testid': dataTestid,
  upleftDownright,
  uprightDownleft,
  ...rest
}: PropsWithChildren<
  { onSelect?: () => void; 'data-testid'?: string } & AnswerLayerProps &
    BorderLayerProps &
    SelectLayerProps &
    MemoLayerProps &
    AdditionalGroupLayerProps
>) {
  return (
    <div
      className={'relative aspect-square select-none'}
      onMouseDown={onSelect}
      data-testid={dataTestid}
      data-select={select}
      data-fix={fix}
      {...rest}
    >
      <BorderLayer right={right} bottom={bottom} />
      <SelectLayer select={select} />
      <AdditionalGroupLayer
        upleftDownright={upleftDownright}
        uprightDownleft={uprightDownleft}
      />
      {answer ? (
        <AnswerLayer answer={answer} fix={fix} />
      ) : (
        <MemoLayer
          blockSize={blockSize}
          memoList={memoList}
          data-testid={`${dataTestid}-memo`}
        />
      )}
    </div>
  );
}

type AdditionalGroupLayerProps = {
  /** 左上から右下にかけての斜めのグループに属するか */
  upleftDownright?: boolean;
  /** 右上から左下にかけての斜めのグループに属するか */
  uprightDownleft?: boolean;
};

/**
 * cell の背景色を表示するレイヤー。
 *
 * - 黒を opacity でグレーにする
 * - 属する AdditionalGroup の数に応じて濃くする。
 */
const AdditionalGroupLayer: React.FC<AdditionalGroupLayerProps> = ({
  upleftDownright,
  uprightDownleft,
}) => {
  const bg = useMemo(() => {
    if (upleftDownright && uprightDownleft) {
      return 'bg-indigo-500/20';
    }
    if (upleftDownright) {
      return 'bg-orange-500/20';
    }
    if (uprightDownleft) {
      return 'bg-sky-500/20';
    }
    return 'bg-transparent';
  }, [upleftDownright, uprightDownleft]);
  return (
    <div className={clsx('w-full h-full absolute top-0 left-0', bg)}></div>
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
  const fontWeight = useMemo(() => (fix ? '700' : undefined), [fix]);
  useLayoutEffect(() => {
    if (box.current?.offsetWidth) {
      setFontSize(`${box.current.offsetWidth / 1.3}px`);
    }
  }, [box.current?.offsetWidth]);
  return (
    <span
      ref={box}
      className="absolute top-0 left-0 w-full h-full flex justify-center items-center select-none"
      style={{ fontSize, fontFamily, fontWeight }}
    >
      {answer}
    </span>
  );
};

export default Cell;

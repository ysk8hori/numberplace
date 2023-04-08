import clsx from 'clsx';
import React, { PropsWithChildren, useMemo } from 'react';
import getAnswerClass from '../utils/answers/getAnswerClass';
import MemoLayer, { Props as MemoLayerProps } from './MemoLayer';
import '../utils/answers/number/normal.scss';
import '../utils/answers/number/bold.scss';
import '../utils/answers/asobi/normal.scss';
import '../utils/answers/asobi/bold.scss';
import { AnswerImageVariant } from '../../../atoms';

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
 * - 特殊なグループに属する場合は着色する
 *   - upleft-downright
 *   - upright-downleft
 *   - hyper
 *
 * 以下のことは行わない。
 *
 * - 自分のポジションを意識した処理
 *
 * ほげ
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
  hyper,
  answerImageVariant = 'num',
  ...rest
}: PropsWithChildren<
  {
    onSelect?: () => void;
    'data-testid'?: string;
  } & Partial<AnswerLayerProps> &
    BorderLayerProps &
    SelectLayerProps &
    MemoLayerProps &
    UpleftDownrightGroupLayerProps &
    UprightDownleftGroupLayerProps &
    HyperGroupLayerProps
>) {
  return (
    <div
      className={'relative aspect-square select-none'}
      onMouseDown={onSelect}
      data-testid={dataTestid}
      data-select={select}
      data-fix={fix}
      data-answer={answer}
      {...rest}
    >
      <BorderLayer right={right} bottom={bottom} />
      <UpleftDownrightGroupLayer upleftDownright={upleftDownright} />
      <UprightDownleftGroupLayer uprightDownleft={uprightDownleft} />
      <HyperGroupLayer hyper={hyper} />
      <SelectLayer select={select} />
      {answer ? (
        <AnswerLayer
          answer={answer}
          fix={fix}
          answerImageVariant={answerImageVariant}
        />
      ) : (
        memoList &&
        memoList.length > 0 && (
          <MemoLayer
            blockSize={blockSize}
            memoList={memoList}
            data-testid={`${dataTestid}-memo`}
            data-memo={memoList}
          />
        )
      )}
    </div>
  );
}

type HyperGroupLayerProps = {
  /** hyper のグループに属するか */
  hyper?: boolean;
};

/**
 * cell の背景色を表示するレイヤー。
 *
 * - 黒を opacity でグレーにする
 * - 属する HyperGroup の数に応じて濃くする。
 */
const HyperGroupLayer: React.FC<HyperGroupLayerProps> = ({ hyper }) => {
  if (!hyper) return null;
  return (
    <div className="w-full h-full absolute top-0 left-0 bg-emerald-400/20"></div>
  );
};

type UpleftDownrightGroupLayerProps = {
  /** 左上から右下にかけての斜めのグループに属するか */
  upleftDownright?: boolean;
};

/**
 * cell の背景色を表示するレイヤー。
 */
const UpleftDownrightGroupLayer: React.FC<UpleftDownrightGroupLayerProps> = ({
  upleftDownright,
}) => {
  if (!upleftDownright) return null;
  return (
    <div className="w-full h-full absolute top-0 left-0 bg-pink-500/20"></div>
  );
};

type UprightDownleftGroupLayerProps = {
  /** 右上から左下にかけての斜めのグループに属するか */
  uprightDownleft?: boolean;
};

/**
 * cell の背景色を表示するレイヤー。
 *
 * - 黒を opacity でグレーにする
 * - 属する AdditionalGroup の数に応じて濃くする。
 */
const UprightDownleftGroupLayer: React.FC<UprightDownleftGroupLayerProps> = ({
  uprightDownleft,
}) => {
  if (!uprightDownleft) return null;
  return (
    <div className="w-full h-full absolute top-0 left-0 bg-sky-500/20"></div>
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
  /** そのセルの答え */
  answer: string;
  /** 変更不可フラグ */
  fix?: boolean;
  answerImageVariant: AnswerImageVariant;
};

/**
 * 答えを表示するレイヤー。
 */
const AnswerLayer: React.FC<AnswerLayerProps> = ({
  answer,
  fix,
  answerImageVariant,
}) => {
  const className = useMemo(
    () =>
      clsx(getAnswerClass({ answer, fix, answerImageVariant }), 'select-none'),
    [answer, fix, answerImageVariant],
  );
  return (
    <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center select-none">
      <div
        role="img"
        className={className}
        style={{ width: '70%', height: '70%' }}
        aria-label={`answer ${answer}`}
      />
    </div>
  );
};

export default Cell;

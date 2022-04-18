import React, { useMemo } from 'react';
import { BlockSize, Position } from '@ysk8hori/numberplace-generator';
import Cell from './cell/Cell';
import { MyGame } from '../../utils/typeUtils';
import clsx from 'clsx';
import { isSamePos } from '../../utils/positionUtils';

type Props = {
  /** ナンプレの問題 */
  puzzle: MyGame;
  /** ナンプレのブロックのサイズ */
  blockSize: BlockSize;
  /** セル選択時イベント */
  onSelectCell?: (pos: Position) => void;
  /** 選択中セルの座標 */
  selectedPos?: Position;
  /** ゲームタイプ：クロス */
  cross?: boolean;
} & React.ComponentProps<'div'>;

/**
 * ナンプレのゲームを表示するゲームボード。以下の特徴を持つ。
 *
 * - 正方形
 * - 親要素に合わせた大きさで表示する
 * - cell を1つ選択状態にできる
 * - 選択したセルをコールバックで親へ伝えられる
 * - 選択中のセルを指定できる
 * - 変更不可であることをセルに指定できる
 * - cross を指定した場合、斜めグループを表現する
 *
 */
const GameBoard: React.FC<Props> = ({
  puzzle,
  blockSize,
  onSelectCell = () => undefined,
  selectedPos,
  className: additionalClassName,
  cross,
}) => {
  const className = useMemo(
    () =>
      clsx(
        [
          'aspect-square',
          'max-w-screen-sm',
          'max-h-screen',
          'grid',
          generateGridColsClass(blockSize),
          'box-border',
          'border-t-2',
          'border-t-black',
          'border-l-2',
          'border-l-black',
        ],
        additionalClassName,
      ),
    [blockSize],
  );
  const upleftDownrightPosList: Position[] = useMemo(() => {
    if (!cross) return new Array<Position>();
    return new Array(blockSize.height * blockSize.width)
      .fill(0)
      .map((_, i) => [i, i]);
  }, [cross, blockSize]);
  const uprightDownleftPosList: Position[] = useMemo(() => {
    if (!cross) return new Array<Position>();
    return new Array(blockSize.height * blockSize.width)
      .fill(0)
      .map((_, i) => [i, blockSize.height * blockSize.width - 1 - i]);
  }, [cross, blockSize]);
  return (
    <div className={className}>
      {puzzle.cells.map(cell => (
        <Cell
          answer={cell.answer}
          key={JSON.stringify(cell.pos)}
          right={(cell.pos[0] + 1) % blockSize.width === 0}
          bottom={(cell.pos[1] + 1) % blockSize.height === 0}
          data-testid={cell.pos.toString()}
          select={
            cell.pos[0] === selectedPos?.[0] && cell.pos[1] === selectedPos?.[1]
              ? true
              : false
          }
          onSelect={() => onSelectCell(cell.pos)}
          fix={cell.isFix}
          blockSize={blockSize}
          memoList={cell.memoList}
          upleftDownright={
            !!upleftDownrightPosList.find(pos => isSamePos(cell.pos, pos))
          }
          uprightDownleft={
            !!uprightDownleftPosList.find(pos => isSamePos(cell.pos, pos))
          }
        />
      ))}
    </div>
  );
};

// function addUpleftDownright(
//   cross:boolean,
//   cell: MyCell,
//   blockSize:BlockSize
// ): MyCell & { upleftDownright?: boolean } {
//   if (!cross) return cell;
//   return {...cell, upleftDownright:}
// }

/**
 * gird-cols-n の tailwind クラスを決定する。
 *
 * @param BlockSize
 * @returns gird-cols-n の tailwind クラス
 */
function generateGridColsClass({
  width,
  height,
}: {
  width: number;
  height: number;
}) {
  return `grid-cols-wrap-${width * height}`;
}

export default GameBoard;

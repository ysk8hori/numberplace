import React, { useMemo } from 'react';
import { BlockSize, Position } from '@ysk8hori/numberplace-generator';
import Cell from './Cell';
import { MyGame } from '../utils/typeUtils';

type Props = {
  /** ナンプレの問題 */
  puzzle: MyGame;
  /** ナンプレのブロックのサイズ */
  blockSize: BlockSize;
  /** セル選択時イベント */
  onSelectCell?: (pos: Position) => void;
  /** 選択中セルの座標 */
  selectedPos?: Position;
};

/**
 * ナンプレのゲームを表示するゲームボード。以下の特徴を持つ。
 *
 * - 正方形
 * - 親要素に合わせた大きさで表示する
 * - cell を1つ選択状態にできる
 * - 選択したセルをコールバックで親へ伝えられる
 * - 選択中のセルを指定できる
 * - 変更不可であることをセルに指定できる
 *
 */
const GameBoard: React.FC<Props> = ({
  puzzle,
  blockSize,
  onSelectCell = () => undefined,
  selectedPos,
}) => {
  const className = useMemo(
    () =>
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
      ].join(' '),
    [blockSize],
  );
  return (
    <div className={className}>
      {puzzle.cells.map(cell => (
        <Cell
          answer={cell.answer}
          key={JSON.stringify(cell.pos)}
          right={(cell.pos[0] + 1) % blockSize.width === 0}
          bottom={(cell.pos[1] + 1) % blockSize.height === 0}
          data-testid={cell.pos}
          select={
            cell.pos[0] === selectedPos?.[0] && cell.pos[1] === selectedPos?.[1]
              ? true
              : false
          }
          onSelect={() => onSelectCell(cell.pos)}
          fix={cell.isFix}
        />
      ))}
    </div>
  );
};

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

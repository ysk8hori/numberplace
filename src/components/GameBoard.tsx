import React, { useMemo } from 'react';
import { BlockSize, Game, Position } from '@ysk8hori/numberplace-generator';
import Cell from './Cell';

/**
 * ナンプレのゲームを表示するゲームボード。以下の特徴を持つ。
 *
 * - 正方形
 * - 親要素に合わせた大きさで表示する
 * - cell を1つ選択状態にできる
 * - 選択したセルをコールバックで親へ伝えられる
 * - 選択中のセルを指定できる
 *
 */
export default function GameBoard({
  puzzle,
  blockSize,
  onSelectCell = () => undefined,
  selectedPos,
}: {
  /** ナンプレの問題 */
  puzzle: Game;
  /** ナンプレのブロックのサイズ */
  blockSize: BlockSize;
  /** セル選択時イベント */
  onSelectCell?: (pos: Position) => void;
  /** 選択中セルの座標 */
  selectedPos?: Position;
}) {
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
        />
      ))}
    </div>
  );
}

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
  return `game-size-${width * height}`;
}

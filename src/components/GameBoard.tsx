import React, { useMemo } from 'react';
import { generateGame } from '@ysk8hori/numberplace-generator';
import Cell from './Cell';

/**
 * ナンプレのゲームを表示するゲームボード。以下の特徴を持つ。
 *
 * - 正方形
 * - 親要素に合わせた大きさで表示する
 *
 */
export default function GameBoard({
  puzzle,
  blockSize,
}: {
  puzzle: ReturnType<typeof generateGame>[0];
  blockSize: Parameters<typeof generateGame>[0];
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

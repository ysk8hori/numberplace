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
        `grid-cols-${blockSize.height * blockSize.width}`,
        'box-border',
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
          data-testid={cell.pos}
        />
      ))}
    </div>
  );
}

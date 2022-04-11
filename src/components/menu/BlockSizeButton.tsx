import { BlockSize } from '@ysk8hori/numberplace-generator';
import clsx from 'clsx';
import React, { useMemo } from 'react';
import { MyGame } from '../../utils/typeUtils';
import GlassCardButton from '../atoms/GlassCardButton';
import GameBoard from '../game/GameBoard';

type Props = React.ComponentProps<'button'> & {
  blockSize: BlockSize;
};

function createGame(blockSize: BlockSize): MyGame {
  const length = blockSize.width * blockSize.height;
  return {
    cells: Array(length)
      .fill(0)
      .map((_, y) =>
        Array(length)
          .fill(0)
          .map((_, x) => ({ pos: [x, y] as const, answer: '?' })),
      )
      .flat(),
  };
}

function BlockSizeButton({ blockSize, className, ...rest }: Props) {
  const gameBoard = useMemo(
    () => (
      <GameBoard
        className="bg-white text-black"
        blockSize={blockSize}
        puzzle={createGame(blockSize)}
      />
    ),
    [blockSize],
  );
  const label = useMemo(() => {
    const sideLength = blockSize.height * blockSize.width;
    return `${sideLength} かける ${sideLength} のサイズを選ぶ`;
  }, [blockSize]);
  return (
    <GlassCardButton
      className={clsx('p-16 aspect-square', className)}
      {...rest}
      aria-label={label}
    >
      {gameBoard}
    </GlassCardButton>
  );
}

export default BlockSizeButton;

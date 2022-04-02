import { BlockSize } from '@ysk8hori/numberplace-generator';
import clsx from 'clsx';
import React, { useMemo } from 'react';
import { MyGame } from '../../utils/typeUtils';
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
    () => <GameBoard blockSize={blockSize} puzzle={createGame(blockSize)} />,
    [blockSize],
  );
  return (
    <button className={clsx('block w-full', className)} {...rest}>
      {gameBoard}
    </button>
  );
}

export default BlockSizeButton;

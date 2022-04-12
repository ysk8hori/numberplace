import { BlockSize } from '@ysk8hori/numberplace-generator';
import clsx from 'clsx';
import React, { useMemo } from 'react';
import { MyGame } from '../../utils/typeUtils';
import GlassCard from '../atoms/GlassCard';
import GlassCardButton from '../atoms/GlassCardButton';
import GameBoard from '../game/GameBoard';
import {
  IoIosArrowDropleftCircle,
  IoIosArrowDroprightCircle,
} from 'react-icons/io';
import { VscTriangleLeft, VscTriangleRight } from 'react-icons/vsc';
import styled from 'styled-components';

type Props = {
  blockSize: BlockSize;
  onClick: () => void;
  className: string;
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

const GameBoardButton = styled.button`
  display: block;
  width: calc(100% - 8rem);
  margin-right: auto;
  margin-left: auto;
`;
function BlockSizeButton({ blockSize, onClick, className }: Props) {
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
    <GlassCard
      className={clsx(
        'p-0 aspect-square flex flex-col items-stretch',
        className,
      )}
    >
      <div className="flex flex-row h-16 justify-center items-center text-gray-500">
        <button className="h-full">
          <VscTriangleLeft className="text-3xl w-16" />
        </button>
        <div className="flex-grow text-center">difficulty</div>
        <button className="h-full">
          <VscTriangleRight className="text-3xl w-16" />
        </button>
      </div>
      <GameBoardButton aria-label={label} onClick={onClick}>
        {gameBoard}
      </GameBoardButton>
    </GlassCard>
  );
}

export default BlockSizeButton;

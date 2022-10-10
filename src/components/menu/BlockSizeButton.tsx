import { BlockSize } from '@ysk8hori/numberplace-generator';
import clsx from 'clsx';
import React, { useMemo, useState } from 'react';
import { MyGame } from '../../utils/typeUtils';
import GlassCard from '../atoms/GlassCard';
import GameBoard from '../game/GameBoard';
import styled from 'styled-components';
import { Difficulty } from '../../utils/difficulty';
import DifficultySelector from './DifficultySelector';

type Props = {
  blockSize: BlockSize;
  onClick: (args: { difficulty: Difficulty }) => void;
  className: string;
  cross?: boolean;
  hyper?: boolean;
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
function BlockSizeButton({
  blockSize,
  onClick,
  className,
  cross,
  hyper,
}: Props) {
  const gameBoard = useMemo(
    () => (
      <GameBoard
        className="bg-white text-black"
        blockSize={blockSize}
        puzzle={createGame(blockSize)}
        cross={cross}
        hyper={hyper}
      />
    ),
    [blockSize],
  );
  const label = useMemo(() => {
    const sideLength = blockSize.height * blockSize.width;
    return `${sideLength} かける ${sideLength}${hyper ? ' ハイパー' : ''}${
      cross ? ' クロス' : ''
    } のサイズを選ぶ`;
  }, [blockSize, cross, hyper]);
  const [difficulty, setDifficulty] = useState<Difficulty>('normal');
  return (
    <div
      className={clsx(
        'p-0 aspect-square flex flex-col items-stretch',
        className,
      )}
    >
      <DifficultySelector
        difficulty={difficulty}
        blockSize={blockSize}
        onSelect={setDifficulty}
      />
      <GameBoardButton
        aria-label={label}
        onClick={() => onClick({ difficulty })}
      >
        {gameBoard}
      </GameBoardButton>
    </div>
  );
}

export default BlockSizeButton;

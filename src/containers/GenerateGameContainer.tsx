import GameContainer from './GameContainer';
import React, { useReducer } from 'react';
import useGenerateGame from '../useGenerateGame';
import { BlockSize } from '@ysk8hori/numberplace-generator';
import { Difficulty } from '../utils/difficulty';
import SelfBuildingSquareSpinner from '../components/atoms/SelfBuildingSquareSpinner';

function GenerateGameContainer({
  blockSize,
  difficulty,
  onChangeSize,
}: {
  blockSize: BlockSize;
  difficulty: Difficulty;
  /** 他のサイズで遊ぶコールバック */
  onChangeSize?: () => void;
}) {
  const [count, forceUpdate] = useReducer((x: number) => x + 1, 0);

  const result = useGenerateGame({ blockSize, count, difficulty });
  if (result.isGenerating) {
    return (
      <div className="flex flex-col justify-center items-center">
        <SelfBuildingSquareSpinner />
        <div>
          <button onClick={result.cancel}>cancel</button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-screen h-screen flex justify-center">
      <GameContainer
        puzzle={result.puzzle}
        corrected={result.corrected}
        blockSize={blockSize}
        onRegenerate={forceUpdate}
        onChangeSize={onChangeSize}
      />
    </div>
  );
}

export default GenerateGameContainer;

import GameContainer from './GameContainer';
import React, { useReducer } from 'react';
import { BlockSize } from '@ysk8hori/numberplace-generator';
import { Difficulty } from '../utils/difficulty';
import useGenerateGame from '../useGenerateGame';
import Generating from '../components/other/Generating';

function GenerateGameContainer({
  blockSize,
  difficulty,
  onChangeSize,
  cross = false,
  hyper = false,
}: {
  blockSize: BlockSize;
  difficulty: Difficulty;
  /** 他のサイズで遊ぶコールバック */
  onChangeSize?: () => void;
  cross?: boolean;
  hyper?: boolean;
}) {
  const [count, forceUpdate] = useReducer((x: number) => x + 1, 0);

  const result = useGenerateGame({
    blockSize,
    count,
    difficulty,
    cross,
    hyper,
  });

  if (result.isGenerating) {
    return <Generating cancel={() => (result.cancel(), onChangeSize?.())} />;
  }

  return (
    <div className="w-screen h-screen flex justify-center">
      <GameContainer
        puzzle={result.puzzle}
        corrected={result.corrected}
        blockSize={blockSize}
        onRegenerate={forceUpdate}
        onChangeSize={onChangeSize}
        cross={cross}
        hyper={hyper}
      />
    </div>
  );
}

export default GenerateGameContainer;

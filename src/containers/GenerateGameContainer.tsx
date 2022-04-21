import GameContainer from './GameContainer';
import React, { useReducer, useState } from 'react';
import useGenerateGame from '../useGenerateGame';
import { BlockSize } from '@ysk8hori/numberplace-generator';
import { Difficulty } from '../utils/difficulty';
import SelfBuildingSquareSpinner from '../components/atoms/SelfBuildingSquareSpinner';
import NeumorphismButton from '../components/atoms/NeumorphismButton';
import styled from 'styled-components';

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
  const [showCancel, setShowCancel] = useState(false);
  setTimeout(() => setShowCancel(true), 3000);

  const result = useGenerateGame({
    blockSize,
    count,
    difficulty,
    cross,
    hyper,
  });
  if (result.isGenerating) {
    return (
      <div className="max-w-lg mx-auto flex flex-col justify-center items-center gap-5">
        <SelfBuildingSquareSpinner />
        <HiddenBox className={showCancel ? 'visible' : undefined}>
          <NeumorphismButton
            onClick={() => (result.cancel(), onChangeSize?.())}
            className="rounded-full px-5 py-1"
          >
            キャンセル
          </NeumorphismButton>
        </HiddenBox>
        <HiddenBox className={showCancel ? 'visible' : undefined}>
          <p>
            ゲームの生成に時間がかかる場合があります。ゲームが生成されない場合はキャンセルし、他の大きさで遊んでください。
          </p>
        </HiddenBox>
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
        cross={cross}
        hyper={hyper}
      />
    </div>
  );
}

const HiddenBox = styled.div`
  visibility: hidden;
  opacity: 0;
  transition-property: opacity visibility;
  transition-duration: 0.5s;
  &.visible {
    visibility: visible;
    opacity: 1;
  }
`;

export default GenerateGameContainer;

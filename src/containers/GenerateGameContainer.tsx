import GenerateGameWorker from '../generateGame.worker?worker';
import GameContainer from './GameContainer';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from 'react';
import { BlockSize } from '@ysk8hori/numberplace-generator';
import { Difficulty } from '../utils/difficulty';
import SelfBuildingSquareSpinner from '../components/atoms/SelfBuildingSquareSpinner';
import NeumorphismButton from '../components/atoms/NeumorphismButton';
import styled from 'styled-components';
import { MyGame } from '../utils/typeUtils';

type Result =
  | {
      /** ゲームの生成をキャンセルする */
      cancel: () => void;
      isGenerating: true;
    }
  | { puzzle: MyGame; corrected: MyGame; isGenerating?: false };

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

  // worker を生成
  const worker = useWorker(blockSize, difficulty);

  // 生成をキャンセルするコールバック
  const cancel = useCallback(() => {
    worker?.terminate();
  }, [count, worker]);
  const [result, setResult] = useState<Result>({ cancel, isGenerating: true });

  useEffect(() => {
    if (!worker) return;
    // ワーカーにゲーム生成を依頼
    worker.postMessage({ blockSize, difficulty, cross, hyper });
    // ワーカーからゲーム生成結果が渡された際の処理を登録
    worker.onmessage = ({ data }) => {
      setResult(data);
    };
    // ワーカーにゲーム生成を依頼
    worker.postMessage({ blockSize, difficulty });
  }, [count, worker]);

  useEffect(() => {
    if (result.isGenerating) {
      // 初回は worker がない状態で cancel コールバックが生成され cancel が機能しないので、
      // worker ありで cancel が生成され直したら result を更新する。
      setResult({ cancel, isGenerating: true });
    }
  }, [cancel]);

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
function useWorker(blockSize: BlockSize, difficulty: string) {
  const worker = useMemo(() => {
    console.log('Generate Worker');
    return new GenerateGameWorker();
  }, []);

  // worker の 破棄を行う useEffect
  useEffect(() => {
    return () => {
      console.log('worker terminate');
      worker.terminate();
    };
  }, [blockSize, difficulty]);
  return worker;
}

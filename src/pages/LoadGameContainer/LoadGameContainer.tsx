import React, { useState } from 'react';
import GameContainer from '../GameContainer';
import { MyGame } from '../../utils/typeUtils';
import {
  analyzeGame,
  BlockSize,
  GameType,
} from '@ysk8hori/numberplace-generator';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { atomOfGame } from '../../atoms';
import { fromURLSearchParams } from '../../utils/URLSearchParamConverter';

/**
 * セーブデータなどからゲームをロードした際に、ゲーム生成処理を介さずにゲームプレイを可能とするコンテナ。
 */
function LoadGameContainer({
  puzzle,
  solved,
  blockSize,
  onChangeSize,
  onRegenerate,
  cross = false,
  hyper = false,
}: {
  /** ナンプレの問題 */
  puzzle: MyGame;
  /** ナンプレの答え */
  solved: MyGame;
  /** ナンプレのブロックのサイズ */
  blockSize: BlockSize;
  /** 他のサイズで遊ぶコールバック */
  onChangeSize?: () => void;
  /** 同じサイズで遊ぶコールバック */
  onRegenerate?: (blockSize: BlockSize) => void;
  cross?: boolean;
  hyper?: boolean;
}) {
  const [doneFirstRender, setDoneFirstRender] = useState<boolean>(false);
  const [game, setGame] = useRecoilState(atomOfGame);
  let loadedGameFromParams;
  if (!doneFirstRender) {
    setDoneFirstRender(true);
    loadedGameFromParams = loadGameFromParams();
  }
  if (loadedGameFromParams) {
    setGame(loadedGameFromParams);
  } else if (!game) {
    onChangeSize?.();
    return null;
  }

  return (
    <div className="grow flex justify-center">
      <GameContainer
        onRegenerate={() => onRegenerate?.(blockSize)}
        onChangeSize={onChangeSize}
      />
    </div>
  );
}

export default LoadGameContainer;

function loadGameFromParams() {
  if (!location.search) return;

  const params = new URLSearchParams(location.search);
  history.replaceState('', '', '/');
  const result = fromURLSearchParams(params);
  if (result.status !== 'success') {
    console.log(result.status);
    return;
  }

  const gameTypes: GameType[] = [];
  if (result.data.cross) gameTypes.push('cross');
  if (result.data.hyper) gameTypes.push('hyper');
  const analyzeResult = analyzeGame({
    ...result.data,
    option: { gameTypes },
  });
  if (analyzeResult.status !== 'solved') {
    console.log(analyzeResult.status);
    return;
  }
  // gameHolder.saveGame({ ...result.data, solved: analyzeResult.solved });
  return { ...result.data, solved: analyzeResult.solved };
}

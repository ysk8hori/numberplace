import React, { useState } from 'react';
import GameContainer from '../GameContainer';
import {
  analyzeGame,
  BlockSize,
  GameType,
} from '@ysk8hori/numberplace-generator';
import { atomOfGame, atomOfSolved } from '../../atoms';
import { fromURLSearchParams } from '../../utils/URLSearchParamConverter';
import { useAtom } from 'jotai';

/**
 * セーブデータなどからゲームをロードした際に、ゲーム生成処理を介さずにゲームプレイを可能とするコンテナ。
 */
function LoadGameContainer({
  onChangeSize,
  onRegenerate,
}: {
  /** 他のサイズで遊ぶコールバック */
  onChangeSize?: () => void;
  /** 同じサイズで遊ぶコールバック */
  onRegenerate?: (blockSize: BlockSize, cross: boolean, hyper: boolean) => void;
}) {
  const [doneFirstRender, setDoneFirstRender] = useState<boolean>(false);
  const [game, setGame] = useAtom(atomOfGame);
  const [solved, setSolved] = useAtom(atomOfSolved);
  let loadedGameFromParams;
  if (!doneFirstRender) {
    setDoneFirstRender(true);
    loadedGameFromParams = loadGameFromParams();
  }
  if (loadedGameFromParams) {
    // URL からゲームをロードできた場合はローカルストレージに保持して rerender を待つ
    setGame(loadedGameFromParams);
    setSolved(loadedGameFromParams.solved);
    return null;
  }
  if (!game || !solved) {
    // 保持しているゲームがない場合やロードしたゲームが不正な場合はメニューへ戻る
    onChangeSize?.();
    return null;
  }

  return (
    <div className="grow flex justify-center">
      <GameContainer
        onRegenerate={() =>
          onRegenerate?.(game.blockSize, game.cross, game.hyper)
        }
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

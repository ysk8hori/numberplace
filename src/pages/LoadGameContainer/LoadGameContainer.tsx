import React, { useEffect, useState } from 'react';
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
  const [initialSearch] = useState(() => location.search);
  const [loadedGameFromParams] = useState(() =>
    loadGameFromParams(initialSearch),
  );
  const [game, setGame] = useAtom(atomOfGame);
  const [solved, setSolved] = useAtom(atomOfSolved);

  useEffect(() => {
    if (initialSearch) {
      history.replaceState('', '', import.meta.env.BASE_URL);
    }
  }, [initialSearch]);

  useEffect(() => {
    if (loadedGameFromParams) {
      // URL からゲームをロードできた場合はローカルストレージに保持する
      setGame(loadedGameFromParams);
      setSolved(loadedGameFromParams.solved);
    }
  }, [loadedGameFromParams, setGame, setSolved]);

  useEffect(() => {
    if (!loadedGameFromParams && (!game || !solved)) {
      // 保持しているゲームがない場合やロードしたゲームが不正な場合はメニューへ戻る
      onChangeSize?.();
    }
  }, [game, loadedGameFromParams, onChangeSize, solved]);

  if (!game || !solved) {
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

function loadGameFromParams(search: string) {
  if (!search) return;

  const params = new URLSearchParams(search);
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

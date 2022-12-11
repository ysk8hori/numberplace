import './App.css';
import GenerateGameContainer from './pages/GenerateGameContainer/GenerateGameContainer';
import React, { useEffect, useState } from 'react';
import gameHolder, { SaveData } from './utils/gameHolder';
import StartMenu from './pages/StartMenu/StartMenu';
import LoadGameContainer from './pages/LoadGameContainer';
import {
  analyzeGame,
  BlockSize,
  GameType,
} from '@ysk8hori/numberplace-generator';
import { Difficulty } from './utils/difficulty';
import { fromURLSearchParams } from './utils/URLSearchParamConverter';
import { useLocalStorage } from 'usehooks-ts';

/**
 * 現在のアプリのモード
 *
 * - menu : ユーザーが何をするかを選ぶスタートメニュー
 * - generateAndPlay : 問題を生成して遊ぶ
 * - loadAndPlay : 保存されていた問題などを読み込んで遊ぶ
 */
type Mode = 'menu' | 'loadAndPlay' | 'generateAndPlay';

function App() {
  const [mode, setMode] = useState<Mode>('menu');
  const [blockSize, setBlockSize] = useState<BlockSize>({
    height: 2,
    width: 3,
  });
  const [cross, setCross] = useState(false);
  const [hyper, setHyper] = useState(false);
  const [difficulty, setDifficulty] = useLocalStorage<Difficulty>(
    'difficulty',
    'normal',
  );
  const [saveData, setSaveData] = useState<SaveData | undefined>(undefined);
  useGameFromParams();
  useGameFromSavedData(setSaveData, setBlockSize, setCross, setHyper, setMode);

  switch (mode) {
    case 'generateAndPlay':
      return (
        <div
          className="w-screen flex justify-center"
          style={{ minHeight: '100svh' }}
        >
          <GenerateGameContainer
            blockSize={blockSize}
            onChangeSize={() => setMode('menu')}
            difficulty={difficulty}
            cross={cross}
            hyper={hyper}
          />
        </div>
      );
    case 'loadAndPlay':
      return (
        <div
          className="w-screen flex justify-center"
          style={{ minHeight: '100svh' }}
        >
          <LoadGameContainer
            blockSize={saveData!.blockSize}
            puzzle={saveData!.puzzle}
            solved={saveData!.solved}
            onChangeSize={() => setMode('menu')}
            onRegenerate={blockSize => (
              setBlockSize(blockSize), setMode('generateAndPlay')
            )}
            cross={cross}
            hyper={hyper}
          />
        </div>
      );
    case 'menu':
    default:
      return (
        <StartMenu
          onChoseBlockSize={(blockSize, difficulty, options) => (
            setBlockSize(blockSize),
            setCross(!!options?.cross),
            setHyper(!!options?.hyper),
            setDifficulty(difficulty),
            setMode('generateAndPlay')
          )}
        />
      );
  }
}

export default App;

function useGameFromSavedData(
  setSaveData: React.Dispatch<React.SetStateAction<SaveData | undefined>>,
  setBlockSize: React.Dispatch<React.SetStateAction<BlockSize>>,
  setCross: React.Dispatch<React.SetStateAction<boolean>>,
  setHyper: React.Dispatch<React.SetStateAction<boolean>>,
  setMode: React.Dispatch<React.SetStateAction<Mode>>,
) {
  useEffect(() => {
    const saveData = gameHolder.loadGame();
    setSaveData(saveData);
    if (saveData) {
      setBlockSize(saveData.blockSize as BlockSize);
      setCross(!!saveData.cross);
      setHyper(!!saveData.hyper);
      setMode('loadAndPlay');
    }
  }, [gameHolder]);
}

function useGameFromParams() {
  useEffect(() => {
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
    gameHolder.saveGame({ ...result.data, solved: analyzeResult.solved });
  }, [location.search, gameHolder]);
}

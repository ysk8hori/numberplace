import './App.css';
import GenerateGameContainer from './pages/GenerateGameContainer/GenerateGameContainer';
import React, { useState } from 'react';
import gameHolder from './utils/gameHolder';
import StartMenu from './pages/StartMenu/StartMenu';
import LoadGameContainer from './pages/LoadGameContainer';
import {
  analyzeGame,
  BlockSize,
  GameType,
} from '@ysk8hori/numberplace-generator';
import { Difficulty } from './utils/difficulty';
import { useLocalStorage } from 'usehooks-ts';
import { MyGame } from './utils/typeUtils';
import { fromURLSearchParams } from './utils/URLSearchParamConverter';

/**
 * 現在のアプリのモード
 *
 * - menu : ユーザーが何をするかを選ぶスタートメニュー
 * - generateAndPlay : 問題を生成して遊ぶ
 * - loadAndPlay : 保存されていた問題などを読み込んで遊ぶ
 */
type Mode = 'menu' | 'loadAndPlay' | 'generateAndPlay';

function App() {
  const [doneFirstRender, setDoneFirstRender] = useState<boolean>(false);
  if (!doneFirstRender) {
    loadGameFromParams();
    setDoneFirstRender(true);
  }
  const initialState = getInitialStates();
  const [mode, setMode] = useState<Mode>(initialState.mode);
  const [blockSize, setBlockSize] = useState<BlockSize>(initialState.blockSize);
  const [cross, setCross] = useState(initialState.cross);
  const [hyper, setHyper] = useState(initialState.hyper);
  const [difficulty, setDifficulty] = useLocalStorage<Difficulty>(
    'difficulty',
    'normal',
  );

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
            blockSize={blockSize}
            puzzle={initialState.puzzle!}
            solved={initialState.solved!}
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

function getInitialStates(): {
  mode: Mode;
  blockSize: BlockSize;
  cross?: boolean;
  hyper?: boolean;
  puzzle?: MyGame;
  solved?: MyGame;
} {
  const saveData = gameHolder.loadGame();
  if (saveData) {
    return {
      mode: 'loadAndPlay',
      ...saveData,
    };
  }

  return {
    mode: 'menu',
    blockSize: {
      height: 2,
      width: 3,
    },
  };
}

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
  gameHolder.saveGame({ ...result.data, solved: analyzeResult.solved });
}

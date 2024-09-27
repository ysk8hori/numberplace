import './App.css';
import GenerateGameContainer from './pages/GenerateGameContainer/GenerateGameContainer';
import React, { useState } from 'react';
import StartMenu from './pages/StartMenu/StartMenu';
import LoadGameContainer from './pages/LoadGameContainer';
import { BlockSize } from '@ysk8hori/numberplace-generator';
import { Difficulty } from './utils/difficulty';
import { useLocalStorage } from 'usehooks-ts';
import { MyGame } from './utils/typeUtils';

/**
 * 現在のアプリのモード
 *
 * - menu : ユーザーが何をするかを選ぶスタートメニュー
 * - generateAndPlay : 問題を生成して遊ぶ
 * - loadAndPlay : 保存されていた問題などを読み込んで遊ぶ
 */
type Mode = 'menu' | 'loadAndPlay' | 'generateAndPlay';

function App() {
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
            onChangeSize={() => setMode('menu')}
            onRegenerate={(blockSize, cross, hyper) => (
              setBlockSize(blockSize),
              setCross(cross),
              setHyper(hyper),
              setMode('generateAndPlay')
            )}
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
  // const game = useAtom(atomOfGame);
  // if (game) {
  //   return {
  //     mode: 'loadAndPlay',
  //     ...game,
  //   };
  // }

  return {
    mode: 'loadAndPlay',
    blockSize: {
      height: 2,
      width: 3,
    },
  };
}

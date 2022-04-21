import './App.css';
import GenerateGameContainer from './containers/GenerateGameContainer';
import React, { useEffect, useState } from 'react';
import gameHolder, { SaveData } from './utils/gameHolder';
import StartMenu from './components/menu/StartMenu';
import LoadGameContainer from './containers/LoadGameContainer';
import { BlockSize } from '@ysk8hori/numberplace-generator';
import { Difficulty } from './utils/difficulty';

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
  // todo difficulty は localstorage で保持して使う
  const [difficulty, setDifficulty] = useState<Difficulty>('easy');
  const [saveData, setSaveData] = useState<SaveData | undefined>(undefined);
  useEffect(() => {
    const saveData = gameHolder.loadGame();
    setSaveData(saveData);
    if (saveData) {
      setBlockSize(saveData.blockSize as BlockSize);
      setCross(!!saveData.cross);
      setHyper(!!saveData.hyper);
      setMode('loadAndPlay');
    }
  }, [mode]);

  switch (mode) {
    case 'generateAndPlay':
      return (
        <div className="w-screen h-screen flex justify-center">
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
        <div className="w-screen h-screen flex justify-center">
          <LoadGameContainer
            blockSize={saveData!.blockSize}
            puzzle={saveData!.puzzle}
            corrected={saveData!.corrected}
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
            setDifficulty(difficulty),
            setMode('generateAndPlay')
          )}
        />
      );
  }
}

export default App;

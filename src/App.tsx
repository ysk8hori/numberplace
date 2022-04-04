import './App.css';
import GenerateGameContainer from './containers/GenerateGameContainer';
import React, { useEffect, useState } from 'react';
import gameHolder, { SaveData } from './utils/gameHolder';
import StartMenu from './components/menu/StartMenu';
import LoadGameContainer from './containers/LoadGameContainer';
import { BlockSize } from '@ysk8hori/numberplace-generator';

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
  const [saveData, setSaveData] = useState<SaveData | undefined>(undefined);
  useEffect(() => {
    const saveData = gameHolder.loadGame();
    setSaveData(saveData);
    if (saveData) {
      setBlockSize(saveData.blockSize as BlockSize);
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
          />
        </div>
      );
    case 'menu':
    default:
      return (
        <StartMenu
          onChoseBlockSize={blockSize => (
            setBlockSize(blockSize), setMode('generateAndPlay')
          )}
        />
      );
  }
}

export default App;

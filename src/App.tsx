import './App.css';
import GenerateGameContainer from './containers/GenerateGameContainer';
import React, { useEffect, useState } from 'react';
import { ArrayItem } from './utils/typeUtils';
import gameHolder, { SaveData } from './utils/gameHolder';
import StartMenu from './components/menu/StartMenu';

/**
 * 現在のアプリのモード
 *
 * - menu : ユーザーが何をするかを選ぶスタートメニュー
 * - play : ナンプレを遊ぶ
 */
type Mode = 'menu' | 'play';

/**
 * 選択可能な BlockSize のリスト
 *
 * 以下の目的で設定している
 *
 * - ユーザーの選択肢を減らすことで遊びやすくする
 * - 大きすぎるサイズは負荷が高くクラッシュする場合があるので生成できないようにする
 */
const blockSizeList = [
  { height: 1, width: 3 } as const,
  { height: 2, width: 2 } as const,
  { height: 2, width: 3 } as const,
  { height: 3, width: 3 } as const,
];

function App() {
  const [mode, setMode] = useState<Mode>('menu');
  const [blockSize, setBlockSize] = useState<ArrayItem<typeof blockSizeList>>({
    height: 2,
    width: 3,
  });
  const [saveData, setSaveData] = useState<SaveData | undefined>(undefined);
  useEffect(() => {
    const saveData = gameHolder.loadGame();
    setSaveData(saveData);
    if (saveData) {
      // TODO: 保存可能なブロックサイズを制限する
      setBlockSize(saveData.blockSize as ArrayItem<typeof blockSizeList>);
      setMode('play');
    }
  }, [mode]);

  switch (mode) {
    case 'menu':
      return (
        <StartMenu
          onChoseBlockSize={blockSize => (
            setBlockSize(blockSize), setMode('play')
          )}
        />
      );
    case 'play':
    default:
      return (
        <div className="w-screen h-screen flex justify-center">
          <GenerateGameContainer
            blockSize={blockSize}
            onChangeSize={() => setMode('menu')}
            saveData={saveData}
          />
        </div>
      );
  }
}

export default App;

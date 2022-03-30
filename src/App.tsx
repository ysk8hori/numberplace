import './App.css';
import GenerateGameContainer from './containers/GenerateGameContainer';
import { useState } from 'react';
import { ArrayItem } from './utils/typeUtils';

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

  switch (mode) {
    case 'menu':
      return (
        <div className="flex flex-col">
          <h1>menu</h1>
          <button
            onClick={() => (
              setBlockSize({ width: 3, height: 1 }), setMode('play')
            )}
          >
            3x1
          </button>
          <button
            onClick={() => (
              setBlockSize({ width: 2, height: 2 }), setMode('play')
            )}
          >
            2x2
          </button>
          <button
            onClick={() => (
              setBlockSize({ width: 3, height: 2 }), setMode('play')
            )}
          >
            3x2
          </button>
          <button
            onClick={() => (
              setBlockSize({ width: 3, height: 3 }), setMode('play')
            )}
          >
            3x3
          </button>
        </div>
      );
    case 'play':
    default:
      return (
        <div className="w-screen h-screen flex justify-center">
          <GenerateGameContainer
            blockSize={blockSize}
            onChangeSize={() => setMode('menu')}
          />
        </div>
      );
  }
}

export default App;

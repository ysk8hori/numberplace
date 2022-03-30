import './App.css';
import GameContainer from './containers/GameContainer';
import { useReducer, useState } from 'react';
import { ArrayItem } from './utils/typeUtils';
import useGenerateGame from './useGenerateGame';

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
  const [count, forceUpdate] = useReducer(x => x + 1, 0);
  const [mode, setMode] = useState<Mode>('menu');
  const [blockSize, setBlockSize] = useState<ArrayItem<typeof blockSizeList>>({
    height: 2,
    width: 3,
  });

  const result = useGenerateGame(blockSize, count);
  if (!result) {
    return <div>loading</div>;
  }

  return (
    <div className="w-screen h-screen flex justify-center">
      <GameContainer
        puzzle={result.puzzle}
        corrected={result.corrected}
        blockSize={blockSize}
        onRegenerate={forceUpdate}
      />
    </div>
  );
}

export default App;

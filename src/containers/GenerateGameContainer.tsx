import GameContainer from './GameContainer';
import React, { useReducer } from 'react';
import useGenerateGame from '../useGenerateGame';
import { BlockSize } from '@ysk8hori/numberplace-generator';
import { SaveData } from '../utils/gameHolder';

function GenerateGameContainer({
  blockSize,
  onChangeSize,
  saveData,
}: {
  blockSize: BlockSize;
  /** 他のサイズで遊ぶコールバック */
  onChangeSize?: () => void;
  /** セーブデータがある場合に指定する */
  saveData?: SaveData;
}) {
  const [count, forceUpdate] = useReducer(x => x + 1, 0);

  const result = useGenerateGame(blockSize, count, saveData);
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
        onChangeSize={onChangeSize}
      />
    </div>
  );
}

export default GenerateGameContainer;

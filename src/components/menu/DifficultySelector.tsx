import { BlockSize } from '@ysk8hori/numberplace-generator';
import React from 'react';
import { VscTriangleLeft, VscTriangleRight } from 'react-icons/vsc';
import { decrement, Difficulty, increment } from '../../utils/difficulty';

type Props = {
  difficulty: Difficulty;
  blockSize: BlockSize;
  onSelect: (difficulty: Difficulty) => void;
};

/**
 * difficulty を選択するためのコンポーネント
 *
 * - 渡された blockSize で選択可能な difficulty のみを選択可能
 * - 選択した difficulty を onSelect で通知する
 * - difficulty の状態管理はこのコンポーネントではしないので、親でする。
 */
function DifficultySelector({ difficulty, blockSize, onSelect }: Props) {
  return (
    <div className="flex flex-row h-16 justify-center items-center text-gray-500">
      <button
        className="h-full"
        aria-label="易しくする"
        onClick={() =>
          onSelect(decrement({ difficulty, blockSize }).difficulty)
        }
      >
        <VscTriangleLeft className="text-3xl w-16" />
      </button>
      <div className="flex-grow text-center">{difficulty}</div>
      <button
        className="h-full"
        aria-label="難しくする"
        onClick={() =>
          onSelect(increment({ difficulty, blockSize }).difficulty)
        }
      >
        <VscTriangleRight className="text-3xl w-16" />
      </button>
    </div>
  );
}

export default DifficultySelector;

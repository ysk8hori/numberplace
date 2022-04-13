import { BlockSize } from '@ysk8hori/numberplace-generator';
import React, { useMemo, useState } from 'react';
import { VscTriangleLeft, VscTriangleRight } from 'react-icons/vsc';

type Props = {
  difficulty: number;
  blockSize: BlockSize;
  onSelect: (difficulty: number) => void;
};

/**
 * difficulty を選択するためのコンポーネント
 *
 * - difficulty のドメイン知識を持つ
 * - 渡された blockSize で選択可能な difficulty のみを onSelect で通知する
 * - difficulty の状態管理はこのコンポーネントではしないので、親でする。
 */
function DifficultySelector({ difficulty, blockSize, onSelect }: Props) {
  return (
    <div className="flex flex-row h-16 justify-center items-center text-gray-500">
      <button
        className="h-full"
        aria-label="易しくする"
        onClick={() => onSelect(--difficulty)}
      >
        <VscTriangleLeft className="text-3xl w-16" />
      </button>
      <div className="flex-grow text-center">difficulty</div>
      <button
        className="h-full"
        aria-label="難しくする"
        onClick={() => onSelect(++difficulty)}
      >
        <VscTriangleRight className="text-3xl w-16" />
      </button>
    </div>
  );
}

export default DifficultySelector;

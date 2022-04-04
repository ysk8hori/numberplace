import React from 'react';
import GameContainer from './GameContainer';
import { MyGame } from '../utils/typeUtils';
import { BlockSize } from '@ysk8hori/numberplace-generator';

/**
 * セーブデータなどからゲームをロードした際に、ゲーム生成処理を介さずにゲームをプレイ可能とするコンテナ。
 * 
 * 本コンテナは、
 */
function GenerateGameContainer({
  puzzle,
  corrected,
  blockSize,
  onChangeSize,
  onRegenerate,
}: {
  /** ナンプレの問題 */
  puzzle: MyGame;
  /** ナンプレの答え */
  corrected: MyGame;
  /** ナンプレのブロックのサイズ */
  blockSize: BlockSize;
  /** 他のサイズで遊ぶコールバック */
  onChangeSize?: () => void;
  /** 同じサイズで遊ぶコールバック */
  onRegenerate?: (blockSize: BlockSize) => void;
}) {
  return (
    <div className="grow flex justify-center">
      <GameContainer
        puzzle={puzzle}
        corrected={corrected}
        blockSize={blockSize}
        onRegenerate={() => onRegenerate?.(blockSize)}
        onChangeSize={onChangeSize}
      />
    </div>
  );
}

export default GenerateGameContainer;

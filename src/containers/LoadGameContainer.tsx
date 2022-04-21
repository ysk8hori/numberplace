import React from 'react';
import GameContainer from './GameContainer';
import { MyGame } from '../utils/typeUtils';
import { BlockSize } from '@ysk8hori/numberplace-generator';

/**
 * セーブデータなどからゲームをロードした際に、ゲーム生成処理を介さずにゲームプレイを可能とするコンテナ。
 */
function LoadGameContainer({
  puzzle,
  corrected,
  blockSize,
  onChangeSize,
  onRegenerate,
  cross = false,
  hyper = false,
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
  cross?: boolean;
  hyper?: boolean;
}) {
  return (
    <div className="grow flex justify-center">
      <GameContainer
        puzzle={puzzle}
        corrected={corrected}
        blockSize={blockSize}
        onRegenerate={() => onRegenerate?.(blockSize)}
        onChangeSize={onChangeSize}
        cross={cross}
        hyper={hyper}
      />
    </div>
  );
}

export default LoadGameContainer;

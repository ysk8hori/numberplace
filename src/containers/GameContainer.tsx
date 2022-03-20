import React, { useState } from 'react';
import { BlockSize, Game, Position } from '@ysk8hori/numberplace-generator';
import GameBoard from '../components/GameBoard';

/**
 * ゲームの状態を保持し制御する。
 *
 * 以下を行う。
 * - ナンプレの問題とサイズ情報を受け取りゲームを描画する
 * - ゲーム初期表示時の選択中セルは 0,0
 * - 選択中セルの状態を保持する
 * - 選択中セルの情報をゲームに反映する
 *
 * 以下を行わない。
 * - ゲームの生成
 */
export default function GameContainer({
  puzzle,
  blockSize,
}: {
  /** ナンプレの問題 */
  puzzle: Game;
  /** ナンプレのブロックのサイズ */
  blockSize: BlockSize;
}) {
  const [selectedPos, setSelectedPos] = useState<Position>([0, 0]);
  return (
    <GameBoard
      puzzle={puzzle}
      blockSize={blockSize}
      selectedPos={selectedPos}
      onSelectCell={setSelectedPos}
    />
  );
}

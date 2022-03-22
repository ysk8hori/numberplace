import React, {
  useCallback,
  useEffect,
  useState,
  useReducer,
  useMemo,
} from 'react';
import { BlockSize, Game, Position } from '@ysk8hori/numberplace-generator';
import GameBoard from '../components/GameBoard';
import { isSamePos, moveX, moveY } from '../utils/positionUtils';

/**
 * ゲームの状態を保持し制御する。
 *
 * 以下を行う。
 * - ナンプレの問題とサイズ情報を受け取りゲームを描画する
 * - ゲーム初期表示時の選択中セルは 0,0
 * - 選択中セルの状態を保持する
 * - 選択中セルの情報をゲームに反映する
 * - キーボードから数字の入力が可能
 * - キーボードの矢印キーで選択セルを変更可能
 *   - 端までいくとループする
 *
 * 以下を行わない。
 * - ゲームの生成
 * - 親から受け取った puzzle の変更
 */
export default function GameContainer({
  puzzle: basePuzzle,
  blockSize,
}: {
  /** ナンプレの問題 */
  puzzle: Game;
  /** ナンプレのブロックのサイズ */
  blockSize: BlockSize;
}) {
  const puzzle = useMemo(
    () => JSON.parse(JSON.stringify(basePuzzle)),
    [basePuzzle],
  );
  const [selectedPos, setSelectedPos] = useState<Position>([0, 0]);
  const [, forceUpdate] = useReducer(x => x + 1, 0);
  const fill = useFill(puzzle, selectedPos, forceUpdate);
  useFillByKeyboard(fill);
  useArrowSelector(selectedPos, blockSize, setSelectedPos);
  return (
    <GameBoard
      puzzle={puzzle}
      blockSize={blockSize}
      selectedPos={selectedPos}
      onSelectCell={setSelectedPos}
    />
  );
}

function useArrowSelector(
  selectedPos: readonly [number, number],
  blockSize: BlockSize,
  setSelectedPos: React.Dispatch<
    React.SetStateAction<readonly [number, number]>
  >,
) {
  const movePos = useCallback(
    (ev: KeyboardEvent) => {
      switch (ev.key) {
        case 'ArrowDown':
          setSelectedPos(
            moveY({
              pos: selectedPos,
              num: 1,
              size: blockSize.height * blockSize.width,
            }),
          );
          break;
        case 'ArrowUp':
          setSelectedPos(
            moveY({
              pos: selectedPos,
              num: -1,
              size: blockSize.height * blockSize.width,
            }),
          );
          break;
        case 'ArrowRight':
          setSelectedPos(
            moveX({
              pos: selectedPos,
              num: 1,
              size: blockSize.height * blockSize.width,
            }),
          );
          break;
        case 'ArrowLeft':
          setSelectedPos(
            moveX({
              pos: selectedPos,
              num: -1,
              size: blockSize.height * blockSize.width,
            }),
          );
          break;
      }
    },
    [selectedPos],
  );
  useEffect(() => {
    window.addEventListener('keydown', movePos);
    return () => window.removeEventListener('keydown', movePos);
  });
}

type Fill = (answer: string) => void;

function useFill(
  puzzle: Game,
  selectedPos: readonly [number, number],
  forceUpdate: React.DispatchWithoutAction,
) {
  return useCallback<Fill>(
    (answer: string) => {
      puzzle.cells.find(cell => isSamePos(cell.pos, selectedPos))!.answer =
        answer;
      forceUpdate();
    },
    [puzzle, selectedPos, forceUpdate],
  );
}

function useFillByKeyboard(fill: Fill) {
  const fillByKeyboard = useCallback(
    (ev: KeyboardEvent) => {
      if (ev.key.match(/[1-9]/)) {
        fill(ev.key);
      }
    },
    [fill],
  );
  useEffect(() => {
    window.addEventListener('keydown', fillByKeyboard);
    return () => window.removeEventListener('keydown', fillByKeyboard);
  });
}

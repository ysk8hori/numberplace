import React, {
  useCallback,
  useEffect,
  useState,
  useReducer,
  useMemo,
} from 'react';
import { BlockSize, Position } from '@ysk8hori/numberplace-generator';
import GameBoard from '../components/GameBoard';
import { isSamePos, moveX, moveY } from '../utils/positionUtils';
import InputPanel from '../components/input-panel/InputPanel';
import { MyGame } from '../utils/typeUtils';
import Verifying from '../components/Verifying';
import Spacer from '../components/atoms/Spacer';
import MistakeNoticeModal from '../components/MistakeNoticeModal';
import GameClearModal from '../components/GameClearModal';

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
 * - 入力パネルを表示する
 * - 入力パネルから数字の入力が可能
 * - 最初から答えが記入済みのセルは変更不可
 * - こたえあわせ開始コールバックでこたえあわせを行う
 *   - 正解した Cell は変更不可とする
 *   - 間違いがある場合はその旨を知らせてゲームを続行する
 *   - 全問正解した場合はその旨を知らせる
 *
 * 以下を行わない。
 * - ゲームの生成
 * - 親から受け取った puzzle の変更
 */
export default function GameContainer({
  puzzle: basePuzzle,
  corrected,
  blockSize,
  onRegenerate,
  onChangeSize,
}: {
  /** ナンプレの問題 */
  puzzle: MyGame;
  /** ナンプレの答え */
  corrected: MyGame;
  /** ナンプレのブロックのサイズ */
  blockSize: BlockSize;
  /** 同じサイズで遊ぶコールバック */
  onRegenerate?: () => void;
  /** 他のサイズで遊ぶコールバック */
  onChangeSize?: () => void;
}) {
  const puzzle = usePuzzle(basePuzzle);
  const [selectedPos, setSelectedPos] = useState<Position>([0, 0]);
  const [hasMistake, setMistake] = useState(false);
  const [hasEmptycell, setEmptycell] = useState(false);
  const [isGameClear, setGameClear] = useState(false);
  const [, forceUpdate] = useReducer(x => x + 1, 0);
  useEffect(() => {
    window.addEventListener('resize', forceUpdate);
    return window.removeEventListener('resize', forceUpdate);
  }, [blockSize]);
  const fill = useFill(puzzle, selectedPos, forceUpdate);
  useFillByKeyboard(fill);
  useArrowSelector(selectedPos, blockSize, setSelectedPos);
  const checkAndUpdate = useCheckAndUpdate(
    corrected,
    setEmptycell,
    setMistake,
    forceUpdate,
    setGameClear,
  );
  /** 次回の check で mistake や empty を検知できるようクリアするコールバック */
  const clearMistakeAndEmptyInfo = useCallback(() => {
    setEmptycell(false);
    setMistake(false);
  }, [setEmptycell, setMistake]);

  return (
    <div className="max-w-xl grow">
      <div className="shadow-xl m-2 bg-white">
        <GameBoard
          puzzle={puzzle}
          blockSize={blockSize}
          selectedPos={selectedPos}
          onSelectCell={setSelectedPos}
        />
      </div>
      <div className="mx-2 my-6">
        <InputPanel blockSize={blockSize} onInput={fill} />
      </div>
      <div className="flex justify-center">
        <Verifying onStartChecking={() => checkAndUpdate(puzzle)} />
      </div>
      <MistakeNoticeModal
        mistake={hasMistake}
        emptycell={hasEmptycell}
        onOk={clearMistakeAndEmptyInfo}
      />
      <GameClearModal
        gameClear={isGameClear}
        onRegenerate={() => (setGameClear(false), onRegenerate?.())}
        onChangeSize={() => (setGameClear(false), onChangeSize?.())}
      />
    </div>
  );
}

/**
 *
 * @param corrected 問題の答え
 * @param setEmptycell check した結果、空欄セルがある場合に true を指定する
 * @param setMistake check した結果、間違えのセルがある場合に true を指定する
 * @param forceUpdate チェック後に fix を反映する
 */
function useCheckAndUpdate(
  corrected: MyGame,
  setEmptycell: React.Dispatch<React.SetStateAction<boolean>>,
  setMistake: React.Dispatch<React.SetStateAction<boolean>>,
  forceUpdate: React.DispatchWithoutAction,
  setGameClear: React.Dispatch<React.SetStateAction<boolean>>,
) {
  return useCallback(
    (puzzle: MyGame) => {
      corrected.cells.forEach(correctedCell => {
        const targetCell = puzzle.cells.find(cell =>
          isSamePos(correctedCell.pos, cell.pos),
        )!;
        // 空欄セルがあるか
        if (!targetCell.answer) return setEmptycell(true);
        if (correctedCell.answer === targetCell.answer) {
          // 正解している cell は fix する
          targetCell.isFix = true;
        } else {
          // 誤答がある場合
          setMistake(true);
        }
      });

      if (puzzle.cells.every(cell => cell.isFix)) setGameClear(true);

      // fix を反映するために forceUpdate する
      forceUpdate();
    },
    [corrected, setEmptycell, setMistake, forceUpdate],
  );
}

function usePuzzle(basePuzzle: MyGame) {
  return useMemo(() => {
    // basePuzzle をクローンする
    const puzzle = JSON.parse(JSON.stringify(basePuzzle)) as MyGame;
    puzzle.cells
      .filter(cell => cell.answer)
      .forEach(cell => (cell.isFix = true));
    return puzzle;
  }, [basePuzzle]);
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
          ev.preventDefault();
          break;
        case 'ArrowUp':
          setSelectedPos(
            moveY({
              pos: selectedPos,
              num: -1,
              size: blockSize.height * blockSize.width,
            }),
          );
          ev.preventDefault();
          break;
        case 'ArrowRight':
          setSelectedPos(
            moveX({
              pos: selectedPos,
              num: 1,
              size: blockSize.height * blockSize.width,
            }),
          );
          ev.preventDefault();
          break;
        case 'ArrowLeft':
          setSelectedPos(
            moveX({
              pos: selectedPos,
              num: -1,
              size: blockSize.height * blockSize.width,
            }),
          );
          ev.preventDefault();
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
  puzzle: MyGame,
  selectedPos: readonly [number, number],
  forceUpdate: React.DispatchWithoutAction,
) {
  return useCallback<Fill>(
    (answer: string) => {
      const targetCell = puzzle.cells.find(
        cell => !cell.isFix && isSamePos(cell.pos, selectedPos),
      );
      if (!targetCell) return;
      targetCell.answer = answer;
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

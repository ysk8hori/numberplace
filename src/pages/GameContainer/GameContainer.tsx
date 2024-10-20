import React, { useCallback, useEffect, useState } from 'react';
import { BlockSize, Position } from '@ysk8hori/numberplace-generator';
import { isSamePos, moveX, moveY } from '../../utils/positionUtils';
import { MyGame } from '../../utils/typeUtils';
import GameBoard from '../../components/game/GameBoard';
import InputPanel from '../../components/game/input-panel/InputPanel';
import Verifying from '../../components/game/Verifying';
import MistakeNoticeModal from '../../components/game/MistakeNoticeModal';
import GameClearModal from '../../components/game/GameClearModal';
import ConfigMenu from '../../components/atoms/ConfigMenu';
import { atomOfInputMode } from './atoms';
import { atomOfGame, atomOfSolved, atomOfInitial } from '../../atoms';
import { assertUndefined } from '../../utils/assertNull';
import { useAtom } from 'jotai';
import { useAtomCallback } from 'jotai/utils';

/** basePuzzle をクローンする */
function clone(basePuzzle: MyGame): MyGame {
  return JSON.parse(JSON.stringify(basePuzzle)) as MyGame;
}

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
 * - 答え合わせ開始コールバックで答え合わせを行う
 *   - 正解した Cell は変更不可とする
 *   - 間違いがある場合はその旨を知らせてゲームを続行する
 *   - 全問正解した場合はその旨を知らせる
 * - 「ゲームをやめる」でメニューに戻る
 * - ゲーム開始時、入力時、入力削除時にゲームを保存する
 * - ゲーム離脱時に保存したゲームを削除する
 *
 * 以下を行わない。
 * - ゲームの生成
 * - 親から受け取った puzzle の変更
 */
export default function GameContainer({
  onRegenerate,
  onChangeSize,
}: {
  /** 同じサイズで遊ぶコールバック */
  onRegenerate?: () => void;
  /** 他のサイズで遊ぶコールバック */
  onChangeSize?: () => void;
}) {
  const [gameData] = useAtom(atomOfGame);
  const [solved] = useAtom(atomOfSolved);
  if (!assertUndefined(gameData)) throw new Error('hoge');
  if (!assertUndefined(solved)) throw new Error('hoge');
  const { puzzle, blockSize, cross, hyper } = gameData;
  const [selectedPos, setSelectedPos] = useState<Position>([0, 0]);
  const [hasMistake, setMistake] = useState(false);
  const [isGameClear, setGameClear] = useState(false);
  const fill = useFill(puzzle, selectedPos, blockSize, cross, hyper)();
  useFillByKeyboard(fill);
  useDeleteByKeybord(fill);
  useArrowSelector(selectedPos, blockSize, setSelectedPos);
  const checkAndUpdate = useCheckAndUpdate(
    solved,
    setMistake,
    setGameClear,
    blockSize,
    cross,
    hyper,
    puzzle,
  );
  useCheckAndUpdateByEnter(checkAndUpdate);
  /** 次回の check で mistake や empty を検知できるようクリアするコールバック */
  const clearMistakeAndEmptyInfo = useCallback(() => {
    setMistake(false);
  }, [setMistake]);

  const completeNumbers = getCompleteNumbers(puzzle, blockSize);
  const [, setSavedGame] = useAtom(atomOfGame);
  const [, setSolvedGame] = useAtom(atomOfSolved);
  const [, setInitialGame] = useAtom(atomOfInitial);
  const reset = useCallback(() => {
    setSavedGame(undefined);
    setSolvedGame(undefined);
    setInitialGame(undefined);
  }, [setSavedGame, setSolvedGame, setInitialGame]);

  return (
    <div className="max-w-xl grow flex flex-col gap-6 p-2">
      <div className="shadow-xl bg-white relative">
        <GameBoard
          puzzle={puzzle}
          blockSize={blockSize}
          selectedPos={selectedPos}
          onSelectCell={setSelectedPos}
          cross={cross}
          hyper={hyper}
        />
      </div>
      <div>
        <InputPanel
          blockSize={blockSize}
          onInput={fill}
          onDelete={() => fill()}
          completedNumbers={completeNumbers}
        />
      </div>
      <div className="flex justify-center">
        <Verifying onStartChecking={() => checkAndUpdate()} />
      </div>
      {hasMistake && <MistakeNoticeModal onOk={clearMistakeAndEmptyInfo} />}
      {isGameClear && (
        <GameClearModal
          onRegenerate={() => (reset(), onRegenerate?.())}
          onChangeSize={() => (reset(), onChangeSize?.())}
        />
      )}
      <ConfigMenu onQuit={() => (reset(), onChangeSize?.())} />
    </div>
  );
}

function getCompleteNumbers(puzzle: MyGame, blockSize: BlockSize) {
  return Array.from(
    puzzle.cells
      .map(c => c.answer)
      .filter(function (answer: string | undefined): answer is string {
        return !!answer;
      })
      .reduce((p, current) => {
        if (p.has(current)) {
          const count = p.get(current)! + 1;
          p.set(current, count);
        } else {
          p.set(current, 1);
        }
        return p;
      }, new Map<string, number>())
      .entries(),
  )
    .filter(([_answer, count]) => count >= blockSize.height * blockSize.width)
    .map(([answer, _count]) => answer);
}

/**
 *
 * @param solved 問題の答え
 * @param setMistake check した結果、間違えのセルがある場合に true を指定する
 */
function useCheckAndUpdate(
  solved: MyGame,
  setMistake: React.Dispatch<React.SetStateAction<boolean>>,
  setGameClear: React.Dispatch<React.SetStateAction<boolean>>,
  blockSize: BlockSize,
  cross: boolean,
  hyper: boolean,
  _puzzle: MyGame,
) {
  const [, saveGame] = useAtom(atomOfGame);
  return useCallback(() => {
    const puzzle = clone(_puzzle);
    solved.cells.forEach(solvedCell => {
      const targetCell = puzzle.cells.find(cell =>
        isSamePos(solvedCell.pos, cell.pos),
      )!;
      if (!targetCell.answer) return;
      if (solvedCell.answer === targetCell.answer) {
        // 正解している cell は fix する
        targetCell.isFix = true;
      } else {
        // 誤答がある場合
        setMistake(true);
      }
    });

    if (puzzle.cells.every(cell => cell.isFix)) setGameClear(true);
    saveGame({ puzzle, blockSize, cross, hyper });
  }, [
    _puzzle,
    solved,
    setGameClear,
    saveGame,
    blockSize,
    cross,
    hyper,
    setMistake,
  ]);
}

function useCheckAndUpdateByEnter(
  _useCheckAndUpdate: ReturnType<typeof useCheckAndUpdate>,
) {
  function enter(ev: KeyboardEvent) {
    if (ev.key !== 'Enter') return;
    _useCheckAndUpdate();
  }

  useEffect(() => {
    window.addEventListener('keydown', enter);
    return () => window.removeEventListener('keydown', enter);
  });
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
    [blockSize.height, blockSize.width, selectedPos, setSelectedPos],
  );
  useEffect(() => {
    window.addEventListener('keydown', movePos);
    return () => window.removeEventListener('keydown', movePos);
  });
}

type Fill = (answer?: string | undefined) => void;

function useFill(
  _puzzle: MyGame,
  selectedPos: readonly [number, number],
  blockSize: BlockSize,
  cross: boolean,
  hyper: boolean,
) {
  return useAtomCallback(
    (get, set) => async (answer?: string | undefined) => {
      console.log(answer);
      // const saveGame = set(atomOfGame);
      const puzzle = clone(_puzzle);
      const targetCell = puzzle.cells.find(cell =>
        isSamePos(cell.pos, selectedPos),
      );
      if (!targetCell || targetCell.isFix) return;
      if (answer === undefined) {
        targetCell.answer = answer;
        targetCell.memoList = undefined;
        set(atomOfGame, { puzzle, blockSize, cross, hyper });
        return;
      }
      // 扱える範囲の数字かどうかをチェックする
      const num = Number(answer);
      if (isNaN(num) || num < 1 || blockSize.height * blockSize.width < num) {
        return;
      }
      const inputMode = get(atomOfInputMode);
      if (inputMode === 'answer') {
        targetCell.memoList = undefined;
        targetCell.answer = answer;
      } else {
        // ターゲットが通常入力済みセルの場合は通常入力していた値をクリアする
        targetCell.answer = undefined;
        // 記入済みの数字ならクリアし、未記入なら記入する
        if (!targetCell.memoList) targetCell.memoList = [];
        if (targetCell.memoList.includes(answer)) {
          targetCell.memoList = targetCell.memoList.reduce((list, current) => {
            if (current !== answer) list.push(current);
            return list;
          }, new Array<string>());
        } else {
          const list = Array.from(targetCell.memoList);
          list.push(answer);
          targetCell.memoList = list;
        }
      }
      set(atomOfGame, { puzzle, blockSize, cross, hyper });
    },
    // [_puzzle, selectedPos, blockSize, cross, hyper],)
  );
}

function useDeleteByKeybord(fill: Fill) {
  const delByKeyboard = useCallback(
    ({ key }: KeyboardEvent) => {
      if (key === 'Backspace') {
        fill();
      }
    },
    [fill],
  );
  useEffect(() => {
    window.addEventListener('keydown', delByKeyboard);
    return () => window.removeEventListener('keydown', delByKeyboard);
  });
}

function useFillByKeyboard(fill: Fill) {
  const fillByKeyboard = useCallback(
    (ev: KeyboardEvent) => {
      if (ev.key.match(/^[1-9]$/)) {
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

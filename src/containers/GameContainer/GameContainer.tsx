import React, {
  useCallback,
  useEffect,
  useState,
  useReducer,
  ComponentProps,
} from 'react';
import { BlockSize, Position } from '@ysk8hori/numberplace-generator';
import { isSamePos, moveX, moveY } from '../../utils/positionUtils';
import { MyGame } from '../../utils/typeUtils';
import gameHolder from '../../utils/gameHolder';
import GameBoard from '../../components/game/GameBoard';
import InputPanel from '../../components/game/input-panel/InputPanel';
import Verifying from '../../components/game/Verifying';
import MistakeNoticeModal from '../../components/game/MistakeNoticeModal';
import GameClearModal from '../../components/game/GameClearModal';
import Quit from '../../components/game/Quit';
import InputNoticeLayer from '../../components/game/InputNoticeLayer';

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
 * - こたえあわせ開始コールバックでこたえあわせを行う
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
  puzzle: basePuzzle,
  solved,
  blockSize,
  onRegenerate,
  onChangeSize,
  cross = false,
  hyper = false,
}: {
  /** ナンプレの問題 */
  puzzle: MyGame;
  /** ナンプレの答え */
  solved: MyGame;
  /** ナンプレのブロックのサイズ */
  blockSize: BlockSize;
  /** 同じサイズで遊ぶコールバック */
  onRegenerate?: () => void;
  /** 他のサイズで遊ぶコールバック */
  onChangeSize?: () => void;
  /** ゲームタイプがクロスかどうか */
  cross?: boolean;
  /** ゲームタイプがHYPERかどうか */
  hyper?: boolean;
}) {
  const [puzzle, setPuzzle] = useState(() => clone(basePuzzle));
  gameHolder.saveGame({ puzzle, solved, blockSize, cross, hyper });
  const [selectedPos, setSelectedPos] = useState<Position>([0, 0]);
  const [hasMistake, setMistake] = useState(false);
  const [hasEmptycell, setEmptycell] = useState(false);
  const [isGameClear, setGameClear] = useState(false);
  const [beforeAfter, setBeforeAfter] = useState<
    ComponentProps<typeof InputNoticeLayer>['beforeAfter']
  >([undefined, undefined]);
  const [, forceUpdate] = useReducer(x => x + 1, 0);
  const fill = useFill(
    puzzle,
    selectedPos,
    forceUpdate,
    blockSize,
    solved,
    cross,
    hyper,
    setPuzzle,
    setBeforeAfter,
  );
  useFillByKeyboard(fill);
  const inputMemo = useInputMemo(
    puzzle,
    selectedPos,
    forceUpdate,
    blockSize,
    solved,
    cross,
    hyper,
    setPuzzle,
  );
  useDeleteByKeybord(fill);
  useArrowSelector(selectedPos, blockSize, setSelectedPos);
  const checkAndUpdate = useCheckAndUpdate(
    solved,
    setEmptycell,
    setMistake,
    forceUpdate,
    setGameClear,
    blockSize,
    cross,
    hyper,
  );
  /** 次回の check で mistake や empty を検知できるようクリアするコールバック */
  const clearMistakeAndEmptyInfo = useCallback(() => {
    setEmptycell(false);
    setMistake(false);
  }, [setEmptycell, setMistake]);

  const completeNumbers = getCompleteNumbers(puzzle, blockSize);

  return (
    <div className="max-w-xl grow">
      <div className="shadow-xl m-2 bg-white relative">
        <InputNoticeLayer
          className="absolute top-0 left-0"
          beforeAfter={beforeAfter}
        />
        <GameBoard
          puzzle={puzzle}
          blockSize={blockSize}
          selectedPos={selectedPos}
          onSelectCell={setSelectedPos}
          cross={cross}
          hyper={hyper}
        />
      </div>
      <div className="mx-2 my-6">
        <InputPanel
          blockSize={blockSize}
          onInput={fill}
          onMemoInput={inputMemo}
          onDelete={() => fill()}
          completedNumbers={completeNumbers}
        />
      </div>
      <div className="flex justify-center gap-8">
        <Quit onQuit={() => (gameHolder.removeSavedGame(), onChangeSize?.())} />
        <Verifying onStartChecking={() => checkAndUpdate(puzzle)} />
      </div>
      <MistakeNoticeModal
        mistake={hasMistake}
        emptycell={hasEmptycell}
        onOk={clearMistakeAndEmptyInfo}
      />
      <GameClearModal
        gameClear={isGameClear}
        onRegenerate={() => (gameHolder.removeSavedGame(), onRegenerate?.())}
        onChangeSize={() => (gameHolder.removeSavedGame(), onChangeSize?.())}
      />
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
 * @param setEmptycell check した結果、空欄セルがある場合に true を指定する
 * @param setMistake check した結果、間違えのセルがある場合に true を指定する
 * @param forceUpdate チェック後に fix を反映する
 */
function useCheckAndUpdate(
  solved: MyGame,
  setEmptycell: React.Dispatch<React.SetStateAction<boolean>>,
  setMistake: React.Dispatch<React.SetStateAction<boolean>>,
  forceUpdate: React.DispatchWithoutAction,
  setGameClear: React.Dispatch<React.SetStateAction<boolean>>,
  blockSize: BlockSize,
  cross: boolean,
  hyper: boolean,
) {
  return useCallback(
    (puzzle: MyGame) => {
      solved.cells.forEach(solvedCell => {
        const targetCell = puzzle.cells.find(cell =>
          isSamePos(solvedCell.pos, cell.pos),
        )!;
        // 空欄セルがあるか
        if (!targetCell.answer) return setEmptycell(true);
        if (solvedCell.answer === targetCell.answer) {
          // 正解している cell は fix する
          targetCell.isFix = true;
        } else {
          // 誤答がある場合
          setMistake(true);
        }
      });

      if (puzzle.cells.every(cell => cell.isFix)) setGameClear(true);
      gameHolder.saveGame({ puzzle, solved, blockSize, cross, hyper });

      // fix を反映するために forceUpdate する
      forceUpdate();
    },
    [solved, setEmptycell, setMistake, forceUpdate, blockSize, cross, hyper],
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

type Fill = (answer?: string | undefined) => void;

function useFill(
  _puzzle: MyGame,
  selectedPos: readonly [number, number],
  forceUpdate: React.DispatchWithoutAction,
  blockSize: BlockSize,
  solved: MyGame,
  cross: boolean,
  hyper: boolean,
  setPuzzle: React.Dispatch<React.SetStateAction<MyGame>>,
  setBeforeAfter: React.Dispatch<
    React.SetStateAction<[string | undefined, string | undefined] | undefined>
  >,
) {
  return useCallback<Fill>(
    (answer?: string | undefined) => {
      const puzzle = clone(_puzzle);
      const targetCell = puzzle.cells.find(cell =>
        isSamePos(cell.pos, selectedPos),
      );
      if (!targetCell || targetCell.isFix) return;
      const before = targetCell.answer;
      if (answer === undefined) {
        targetCell.answer = answer;
        targetCell.memoList = undefined;
        gameHolder.saveGame({ puzzle, solved, blockSize, cross, hyper });
        setBeforeAfter([before, answer]);
        setPuzzle(puzzle);
        forceUpdate();
        return;
      }
      // 扱える範囲の数字かどうかをチェックする
      const num = Number(answer);
      if (isNaN(num) || num < 1 || blockSize.height * blockSize.width < num) {
        return;
      }
      targetCell.answer = answer;
      gameHolder.saveGame({ puzzle, solved, blockSize, cross, hyper });
      setBeforeAfter([before, answer]);
      setPuzzle(puzzle);
      forceUpdate();
    },
    [
      _puzzle,
      selectedPos,
      forceUpdate,
      blockSize,
      solved,
      cross,
      hyper,
      setPuzzle,
    ],
  );
}

type InputMemo = (answerCandidate: string) => void;

/**
 * メモ記入処理
 *
 * 実現すること
 *
 * - メモモードで空欄セルにメモ記入
 * - メモモードでメモ済み数字と同じボタン押下でそのメモ数字を消す
 * - ターゲットが通常入力済みセルの場合は通常入力していた値をクリアする
 *
 */
function useInputMemo(
  _puzzle: MyGame,
  selectedPos: readonly [number, number],
  forceUpdate: React.DispatchWithoutAction,
  blockSize: BlockSize,
  solved: MyGame,
  cross: boolean,
  hyper: boolean,
  setPuzzle: React.Dispatch<React.SetStateAction<MyGame>>,
) {
  return useCallback<InputMemo>(
    (answerCandidate: string) => {
      const puzzle = clone(_puzzle);
      const targetCell = puzzle.cells.find(cell =>
        isSamePos(cell.pos, selectedPos),
      );
      if (!targetCell || targetCell.isFix) return;
      // 扱える範囲の数字かどうかをチェックする
      const num = Number(answerCandidate);
      if (isNaN(num) || num < 1 || blockSize.height * blockSize.width < num) {
        return;
      }
      // ターゲットが通常入力済みセルの場合は通常入力していた値をクリアする
      targetCell.answer = undefined;
      // 記入済みの数字ならクリアし、未記入なら記入する
      if (!targetCell.memoList) targetCell.memoList = [];
      if (targetCell.memoList.includes(answerCandidate)) {
        targetCell.memoList = targetCell.memoList.reduce((list, current) => {
          if (current !== answerCandidate) list.push(current);
          return list;
        }, new Array<string>());
      } else {
        const list = Array.from(targetCell.memoList);
        list.push(answerCandidate);
        targetCell.memoList = list;
      }
      gameHolder.saveGame({
        puzzle,
        solved,
        blockSize,
        cross,
        hyper,
      });
      setPuzzle(puzzle);
      forceUpdate();
    },
    [
      _puzzle,
      selectedPos,
      forceUpdate,
      blockSize,
      solved,
      cross,
      hyper,
      setPuzzle,
    ],
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
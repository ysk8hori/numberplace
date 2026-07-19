import GameContainer from '../GameContainer';
import React, { Suspense, useEffect, useReducer } from 'react';
import { BlockSize } from '@ysk8hori/numberplace-generator';
import { Difficulty } from '../../utils/difficulty';
import useGenerateGame from './utils/useGenerateGame';
import Generating from '../../components/other/Generating';
import { useQueryClient } from '@tanstack/react-query';
import { useAtomValue, useSetAtom } from 'jotai';
import { atomOfGame, atomOfInitial, atomOfSolved } from '../../atoms';
import { assertUndefined } from '../../utils/assertNull';

function Inner({
  blockSize,
  difficulty,
  onChangeSize,
  onRegenerate,
  cross = false,
  hyper = false,
  count,
}: {
  blockSize: BlockSize;
  difficulty: Difficulty;
  /** 他のサイズで遊ぶコールバック */
  onChangeSize?: () => void;
  onRegenerate: () => void;
  cross?: boolean;
  hyper?: boolean;
  count: number;
}) {
  const setGame = useSetAtom(atomOfGame);
  const setSolved = useSetAtom(atomOfSolved);
  const setInitial = useSetAtom(atomOfInitial);
  const gameData = useAtomValue(atomOfGame);
  const solvedData = useAtomValue(atomOfSolved);
  const { data } = useGenerateGame({
    blockSize,
    difficulty,
    cross,
    hyper,
    count,
  });
  useEffect(() => {
    if (!assertUndefined(data)) return;
    setGame({
      puzzle: data.puzzle,
      blockSize,
      cross,
      hyper,
    });
    setSolved(data.solved);
    setInitial(data.puzzle);
  }, [blockSize, cross, data, hyper, setGame, setInitial, setSolved]);

  if (!assertUndefined(data)) return null;
  const isReady =
    gameData?.puzzle === data.puzzle && solvedData?.cells === data.solved.cells;
  if (!isReady) return null;

  return (
    <GameContainer onRegenerate={onRegenerate} onChangeSize={onChangeSize} />
  );
}

function GenerateGameContainer({
  blockSize,
  difficulty,
  onChangeSize,
  cross = false,
  hyper = false,
}: {
  blockSize: BlockSize;
  difficulty: Difficulty;
  /** 他のサイズで遊ぶコールバック */
  onChangeSize?: () => void;
  cross?: boolean;
  hyper?: boolean;
}) {
  const [count, forceUpdate] = useReducer((x: number) => x + 1, 0);
  const queryClient = useQueryClient();
  return (
    <div className="w-screen h-screen flex justify-center" key={count}>
      <Suspense
        fallback={
          <Generating
            cancel={() => {
              queryClient.cancelQueries({
                queryKey: [
                  'generate-game',
                  blockSize,
                  difficulty,
                  cross,
                  hyper,
                ],
              });
              onChangeSize?.();
            }}
            reGenerate={() => {
              queryClient.cancelQueries({
                queryKey: [
                  'generate-game',
                  blockSize,
                  difficulty,
                  cross,
                  hyper,
                ],
              });
              forceUpdate();
            }}
          />
        }
      >
        <Inner
          blockSize={blockSize}
          onChangeSize={onChangeSize}
          cross={cross}
          hyper={hyper}
          difficulty={difficulty}
          onRegenerate={() => forceUpdate()}
          count={count}
        />
      </Suspense>
    </div>
  );
}

export default GenerateGameContainer;

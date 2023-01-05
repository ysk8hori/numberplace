import GameContainer from '../GameContainer';
import React, { Suspense, useReducer } from 'react';
import { BlockSize } from '@ysk8hori/numberplace-generator';
import { Difficulty } from '../../utils/difficulty';
import useGenerateGame from './utils/useGenerateGame';
import Generating from '../../components/other/Generating';
import ConfigMenu from '../../components/atoms/ConfigMenu';
import { useQueryClient } from '@tanstack/react-query';
import { useSetRecoilState } from 'recoil';
import { atomOfGame } from '../../atoms';
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
  const setGame = useSetRecoilState(atomOfGame);
  const { data } = useGenerateGame({
    blockSize,
    difficulty,
    cross,
    hyper,
    count,
  });
  if (!assertUndefined(data)) return null;

  setGame({
    puzzle: data.puzzle,
    solved: data.solved,
    blockSize,
    cross,
    hyper,
  });
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
      <ConfigMenu />
    </div>
  );
}

export default GenerateGameContainer;

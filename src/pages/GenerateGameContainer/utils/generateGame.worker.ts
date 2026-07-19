import 'reflect-metadata';
import { BlockSize } from '@ysk8hori/numberplace-generator';
import { Difficulty, difficultyAdjustment } from '../../../utils/difficulty';
import { MyGame } from '../../../utils/typeUtils';
import { toURLSearchParam } from '../../../utils/URLSearchParamConverter';
import { markFixed } from '../../../utils/utils';
import { generateWithWasm } from './wasmSudokuGenerator';

onmessage = async ev => {
  try {
    const { blockSize, difficulty, cross, hyper } = ev.data as {
      blockSize: BlockSize;
      difficulty: Difficulty;
      cross: boolean | undefined;
      hyper: boolean | undefined;
    };

    const { puzzle: tempPuzzle, solved } = await generateWithWasm({
      blockSize,
      cross,
      hyper,
    });

    const puzzle = difficultyAdjustment({
      puzzle: tempPuzzle,
      solved,
      difficulty,
      blockSize,
    });
    markFixed(puzzle);
    const params = toURLSearchParam({
      puzzle,
      blockSize,
      cross,
      hyper,
    });
    console.log(`/?${params.toString()}`);
    const result: SuccessResult = {
      puzzle: puzzle,
      solved,
    };
    postMessage(result);
  } catch (error) {
    postMessage({
      errorMessage: error instanceof Error ? error.message : String(error),
    } satisfies ErrorResult);
  }
};

export type SuccessResult = {
  puzzle: MyGame;
  solved: MyGame;
  isGenerating?: false;
};

export type Result = SuccessResult | ErrorResult;

export type ErrorResult = {
  errorMessage: string;
};

// vite では xxx?worker の形でインポートすることで WebWorker として利用できる
import GenerateGameWorker from './generateGame.worker?worker';
import { BlockSize } from '@ysk8hori/numberplace-generator';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { MyGame } from './utils/typeUtils';
import { Difficulty } from './utils/difficulty';

type Result =
  | {
      /** ゲームの生成をキャンセルする */
      cancel: () => void;
      isGenerating: true;
    }
  | { puzzle: MyGame; solved: MyGame; isGenerating?: false };

function useWorker(blockSize: BlockSize, difficulty: string) {
  const worker = useMemo(() => {
    console.log('Generate Worker');
    return new GenerateGameWorker();
  }, []);

  // worker の 破棄を行う useEffect
  useEffect(() => {
    return () => {
      console.log('worker terminate');
      worker.terminate();
    };
  }, [blockSize, difficulty]);
  return worker;
}

/**
 * ナンプレのゲームを生成する hooks
 *
 * @param blockSize ゲームのブロックサイズ
 * @param count ゲームを再生成するたびにインクリメントされる値
 * @returns ゲーム生成状況や結果
 */
export default function useGenerateGame({
  blockSize,
  count,
  difficulty,
  cross,
  hyper,
}: {
  blockSize: BlockSize;
  count: number;
  difficulty: Difficulty;
  cross?: boolean;
  hyper?: boolean;
}): Result {
  // worker を生成
  const worker = useWorker(blockSize, difficulty);

  // 生成をキャンセルするコールバック
  const cancel = useCallback(() => {
    worker?.terminate();
  }, [worker]);

  const [result, setResult] = useState<Result>({ cancel, isGenerating: true });
  useEffect(() => setResult({ cancel, isGenerating: true }), [count]);

  useEffect(() => {
    // ワーカーにゲーム生成を依頼
    worker.postMessage({ blockSize, difficulty, cross, hyper });
    // ワーカーからゲーム生成結果が渡された際の処理を登録
    worker.onmessage = ({ data }) => {
      setResult(data);
    };
  }, [count, worker]);

  return result;
}

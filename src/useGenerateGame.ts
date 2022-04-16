// vite では xxx?worker の形でインポートすることで WebWorker として利用できる
import GenerateGameWorker from './generateGame.worker?worker';
import { BlockSize } from '@ysk8hori/numberplace-generator';
import { useCallback, useEffect, useState } from 'react';
import { MyGame } from './utils/typeUtils';
import { Difficulty } from './utils/difficulty';

type Result =
  | {
      /** ゲームの生成をキャンセルする */
      cancel: () => void;
      isGenerating: true;
    }
  | { puzzle: MyGame; corrected: MyGame; isGenerating?: false };

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
}: {
  blockSize: BlockSize;
  count: number;
  difficulty: Difficulty;
  cross?: boolean;
}): Result {
  // worker を生成
  const [worker, setWorker] = useState<Worker | undefined>();
  // 生成をキャンセルするコールバック
  const cancel = useCallback(() => {
    worker?.terminate();
  }, [count, worker]);
  const [result, setResult] = useState<Result>({ cancel, isGenerating: true });

  useEffect(() => {
    setWorker(new GenerateGameWorker());
  }, [blockSize, count]);

  useEffect(() => {
    if (!worker) return;
    // ワーカーにゲーム生成を依頼
    worker.postMessage({ blockSize, difficulty, cross });
    // ワーカーからゲーム生成結果が渡された際の処理を登録
    worker.onmessage = ({ data }) => {
      worker.terminate(); // ワーカーを破棄する
      setResult(data);
    };
    // ワーカーにゲーム生成を依頼
    worker.postMessage({ blockSize, difficulty });
  }, [count, worker]);

  useEffect(() => {
    if (result.isGenerating) {
      // 初回は worker がない状態で cancel コールバックが生成され cancel が機能しないので、
      // worker ありで cancel が生成され直したら result を更新する。
      setResult({ cancel, isGenerating: true });
    }
  }, [cancel]);

  return result;
}

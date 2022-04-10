// vite では xxx?worker の形でインポートすることで WebWorker として利用できる
import GenerateGameWorker from './generateGame.worker?worker';
import { BlockSize } from '@ysk8hori/numberplace-generator';
import { useEffect, useState } from 'react';
import { MyGame } from './utils/typeUtils';

type Result = undefined | { puzzle: MyGame; corrected: MyGame };

/**
 * ナンプレのゲームを生成する hooks
 *
 * @param blockSize ゲームのブロックサイズ
 * @param count ゲームを再生成するたびにインクリメントされる値
 * @returns ゲーム生成結果
 */
export default function useGenerateGame(
  blockSize: BlockSize,
  count: number,
): Result {
  const [result, setResult] = useState<Result>(undefined);
  useEffect(() => {
    // worker を生成
    const worker = new GenerateGameWorker();
    // ワーカーにゲーム生成を依頼
    worker.postMessage(blockSize);
    // ワーカーからゲーム生成結果が渡された際の処理を登録
    worker.onmessage = ({ data }) => {
      worker.terminate(); // ワーカーを破棄する
      setResult(data);
    };
    // return () => worker.terminate(); // ワーカーを破棄する
  }, [blockSize, count]);

  return result;
}

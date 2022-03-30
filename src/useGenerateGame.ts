// vite では xxx?worker の形でインポートすることで WebWorker として利用できる
import GenerateGameWorker from './generateGame.worker?worker';
import { BlockSize } from '@ysk8hori/numberplace-generator';
import { useEffect, useState } from 'react';
import { MyGame } from './utils/typeUtils';

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
): undefined | { puzzle: MyGame; corrected: MyGame } {
  const [result, setResult] = useState<
    undefined | { puzzle: MyGame; corrected: MyGame }
  >(undefined);
  useEffect(() => {
    // worker を生成
    const worker = new GenerateGameWorker();
    // ワーカーにゲーム生成を依頼
    worker.postMessage(blockSize);
    // ワーカーからゲーム生成結果が渡された際の処理を登録
    worker.onmessage = ev => {
      setResult({
        puzzle: ev.data[0],
        corrected: ev.data[1],
      });
    };
    return () => worker.terminate(); // ワーカーを破棄する
  }, [blockSize, count]);
  return result;
}

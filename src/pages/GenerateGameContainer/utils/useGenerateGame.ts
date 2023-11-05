// vite では xxx?worker の形でインポートすることで WebWorker として利用できる
import GenerateGameWorker from './generateGame.worker?worker';
import type { Result } from './generateGame.worker';
import { BlockSize } from '@ysk8hori/numberplace-generator';
import { Difficulty } from '../../../utils/difficulty';
import { useSuspenseQuery } from '@tanstack/react-query';

/**
 * ナンプレのゲームを生成する hooks
 *
 * @param blockSize ゲームのブロックサイズ
 * @param count ゲームを再生成するたびにインクリメントされる値
 * @returns ゲーム生成状況や結果
 */

export default function useGenerateGame({
  blockSize,
  difficulty,
  cross,
  hyper,
  count,
}: {
  blockSize: BlockSize;
  difficulty: Difficulty;
  cross?: boolean;
  hyper?: boolean;
  count: number;
}) {
  return useSuspenseQuery({
    queryKey: ['generate-game', blockSize, difficulty, cross, hyper, count],
    queryFn: ({ signal }) =>
      generateGameAsync({ blockSize, difficulty, cross, hyper, signal }),
    gcTime: 0,
    staleTime: 0,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    retry: false,
    retryOnMount: false,
  });
}

function generateGameAsync({
  blockSize,
  difficulty,
  cross,
  hyper,
  signal,
}: {
  blockSize: BlockSize;
  difficulty: Difficulty;
  cross?: boolean;
  hyper?: boolean;
  signal: AbortSignal | undefined;
}): Promise<Result> {
  const worker = new GenerateGameWorker();
  signal?.addEventListener('abort', () => {
    worker.terminate();
    console.log('worker terminated by cancel signal.');
  });
  console.log('worker generated.');
  return new Promise<Result>(resolve => {
    // ワーカーにゲーム生成を依頼
    worker.postMessage({ blockSize, difficulty, cross, hyper });
    // ワーカーからゲーム生成結果が渡された際の処理を登録
    worker.onmessage = ({ data }) => resolve(data);
  }).finally(() => {
    worker.terminate();
    console.log('worker terminated.');
  });
}

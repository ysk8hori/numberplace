import { Trace } from '@/utils/trace';

export default class AnalyzeTimeoutError extends Error {
  @Trace
  public static throw(): never {
    console.log('解析処理がタイムアウトしました');
    throw new Error('解析処理がタイムアウトしました');
  }
  public static readonly TIMEOUT_MILLIS = 1000;
}

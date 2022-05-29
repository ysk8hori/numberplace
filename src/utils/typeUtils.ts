import { Game } from '@ysk8hori/numberplace-generator';

/** アプリケーションで拡張したゲーム */
export type MyGame = Pick<Game, 'toString'> & {
  cells: Array<MyCell>;
};

/** アプリケーションで拡張したセル */
export type MyCell = Game['cells'][number] & {
  isFix?: boolean;
  memoList?: string[];
};

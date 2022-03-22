import { Game } from '@ysk8hori/numberplace-generator';

/** Array の item の型 */
export type ArrayItem<T extends Array<unknown>> = T extends Array<infer T2>
  ? T2
  : never;

/** アプリケーションで拡張したゲーム */
export type MyGame = Pick<Game, 'toString'> & {
  cells: Array<ArrayItem<Game['cells']> & { isFix?: boolean }>;
};

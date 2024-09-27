import { BlockSize } from '@ysk8hori/numberplace-generator';
import { MyGame } from './utils/typeUtils';
import { focusAtom } from 'jotai-optics';
import { atomWithStorage, createJSONStorage } from 'jotai/utils';

/** 現在解いているゲーム */
export type SaveData = {
  puzzle: MyGame;
  blockSize: BlockSize;
  cross: boolean;
  hyper: boolean;
};

export const atomOfGame = atomWithStorage<SaveData | undefined>(
  'gameData',
  undefined,
  createJSONStorage(),
  { getOnInit: true },
);

export const atomOfPazzle = focusAtom(atomOfGame, optic =>
  optic.optional().prop('puzzle'),
);

/** 現在解いているゲームの解答 */
export const atomOfSolved = atomWithStorage<MyGame | undefined>(
  'solved',
  undefined,
  createJSONStorage(),
  { getOnInit: true },
);

/** 現在解いているゲームの初期状態 */
export const atomOfInitial = atomWithStorage<MyGame | undefined>(
  'initial',
  undefined,
  createJSONStorage(),
  { getOnInit: true },
);

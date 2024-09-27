import { BlockSize } from '@ysk8hori/numberplace-generator';
import { atom, AtomEffect, selector } from 'recoil';
import { MyGame } from './utils/typeUtils';

const localStorageEffect: <T>(key: string) => AtomEffect<T> =
  key =>
  ({ setSelf, onSet }) => {
    const savedValue = localStorage.getItem(key);
    if (savedValue != null) {
      setSelf(JSON.parse(savedValue));
    }

    onSet((newValue, _, isReset) => {
      isReset
        ? localStorage.removeItem(key)
        : localStorage.setItem(key, JSON.stringify(newValue));
    });
  };

/** 現在解いているゲーム */
export type SaveData = {
  puzzle: MyGame;
  blockSize: BlockSize;
  cross: boolean;
  hyper: boolean;
};

export const atomOfGame = atom<SaveData | undefined>({
  key: 'gameData',
  default: undefined,
  effects: [localStorageEffect('game')],
});

export const atomOfPazzle = selector<MyGame | undefined>({
  key: 'puzzle',
  get: ({ get }) => get(atomOfGame)?.puzzle,
});

/** 現在解いているゲームの解答 */
export const atomOfSolved = atom<MyGame | undefined>({
  key: 'solved',
  default: undefined,
  effects: [localStorageEffect('solved')],
});

/** 現在解いているゲームの初期状態 */
export const atomOfInitial = atom<MyGame | undefined>({
  key: 'initial',
  default: undefined,
  effects: [localStorageEffect('initial')],
});

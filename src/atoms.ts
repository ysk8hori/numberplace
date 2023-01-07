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

export type AnswerImageVariant = 'num' | 'asobi';

export const atomOfAnswerImageVariant = atom<AnswerImageVariant>({
  key: 'answerImageVariant',
  default: 'num',
  effects: [localStorageEffect('answerImageVariant')],
});

export type SaveData = {
  puzzle: MyGame;
  solved: MyGame;
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

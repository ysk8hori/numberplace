import { atom, AtomEffect } from 'recoil';

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

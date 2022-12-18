import { atom } from 'recoil';

export type InputMode = 'answer' | 'memo';

export const atomOfInputMode = atom<InputMode>({
  key: 'inputMode',
  default: 'answer',
});

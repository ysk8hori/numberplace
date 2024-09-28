import { atom } from 'jotai';

export type InputMode = 'answer' | 'memo';

export const atomOfInputMode = atom<InputMode>('answer');

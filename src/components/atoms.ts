import { atom } from 'recoil';

export type AnswerImageVariant = 'num' | 'asobi';

export const atomOfAnswerImageVariant = atom<AnswerImageVariant>({
  key: 'answerImageVariant',
  default: 'num',
});

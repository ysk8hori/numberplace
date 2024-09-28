import { atomWithStorage, createJSONStorage } from 'jotai/utils';

export type AnswerImageVariant = 'num' | 'asobi';

export const atomOfAnswerImageVariant = atomWithStorage<AnswerImageVariant>(
  'answerImageVariant',
  'num',
  createJSONStorage(),
  { getOnInit: true },
);

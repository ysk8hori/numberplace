import { AnswerImageVariant } from '../../../../jotaiAtoms';

export default function getAnswerClass({
  answer,
  fix = false,
  disabled = false,
  answerImageVariant,
}: {
  answer: string | undefined;
  fix?: boolean;
  disabled?: boolean;
  answerImageVariant: AnswerImageVariant;
}) {
  return answer === '?'
    ? 'question'
    : `${answerImageVariant}${answer}${disabled ? 'disabled' : ''}${
        fix ? 'bold' : ''
      }`;
}

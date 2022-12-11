export default function getAnswerClass({
  answer,
  fix = false,
  disabled = false,
  answerSvgType = 'asobi',
}: {
  answer: string | undefined;
  fix?: boolean;
  disabled?: boolean;
  answerSvgType?: 'num' | 'asobi';
}) {
  return answer === '?'
    ? 'question'
    : `${answerSvgType}${answer}${disabled ? 'disabled' : ''}${
        fix ? 'bold' : ''
      }`;
}

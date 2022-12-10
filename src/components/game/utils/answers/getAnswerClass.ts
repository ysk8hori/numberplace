export default function getAnswerClass({
  answer,
  fix = false,
  disabled = false,
  answerSvgType = 'num',
}: {
  answer: string | undefined;
  fix?: boolean;
  disabled?: boolean;
  answerSvgType?: 'num';
}) {
  return answer === '?'
    ? 'question'
    : `${answerSvgType}${answer}${disabled ? 'disabled' : ''}${
        fix ? 'bold' : ''
      }`;
}

export default function getAnswerClass({
  answer,
  fix = false,
  answerSvgType = 'num',
}: {
  answer: string | undefined;
  fix?: boolean;
  answerSvgType?: 'num';
}) {
  return answer ? `${answerSvgType}${answer}${fix ? 'bold' : ''}` : undefined;
}

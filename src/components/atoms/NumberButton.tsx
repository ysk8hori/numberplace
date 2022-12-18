import { BlockSize } from '@ysk8hori/numberplace-generator';
import React, { useCallback, useMemo } from 'react';
import Button from './Button';
import getAnswerClass from '../game/utils/answers/getAnswerClass';
import '../game/utils/answers/number/normal.scss';
import '../game/utils/answers/number/disabled.scss';
import '../game/utils/answers/asobi/normal.scss';
import '../game/utils/answers/asobi/disabled.scss';
import { useRecoilValue } from 'recoil';
import { atomOfAnswerImageVariant } from '../../atoms';

type Props = {
  /** ゲームのブロックサイズ */
  blockSize: BlockSize;
  /**
   * 入力が完了した数字のリスト（入力が完了した数字とは、
   * 例えば BlockSize:{width:2, height:2} のサイズで
   * 1 が 4 箇所に記入されている状態を「1の入力が完了した」と表現している）
   */
  completedNumbers?: string[];
  /** 入力ボタンを押下した際のイベント */
  onInput?: (buttonText: string) => void;
};

export default function NumberButton({
  onInput,
  completedNumbers,
  buttonNumber,
  size,
}: Required<Props> & {
  buttonNumber: number;
  size: number;
}) {
  const answerImageVariant = useRecoilValue(atomOfAnswerImageVariant);
  const onClick = useCallback(
    () => onInput(buttonNumber.toString()),
    [onInput, buttonNumber],
  );
  const disabled = useMemo(
    () =>
      size < buttonNumber || completedNumbers.includes(buttonNumber.toString()),
    [size, buttonNumber, completedNumbers],
  );

  const className = useMemo(
    () =>
      getAnswerClass({
        answer: buttonNumber.toString(),
        disabled,
        answerImageVariant,
      }),
    [buttonNumber, disabled, answerImageVariant],
  );
  return (
    <Button
      data-testid={`input_${buttonNumber}`}
      onClick={onClick}
      disabled={disabled}
      aria-label={buttonNumber.toString()}
      className="flex justify-center items-center aspect-square"
      variant="text"
    >
      <div className={className} style={{ width: '60%', height: '60%' }}></div>
    </Button>
  );
}

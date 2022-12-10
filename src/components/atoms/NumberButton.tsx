import { BlockSize } from '@ysk8hori/numberplace-generator';
import React, { useCallback, useMemo } from 'react';
import Button from './Button';
import getAnswerClass from '../game/utils/answers/getAnswerClass';
import '../game/utils/answers/number/normal.scss';
import '../game/utils/answers/number/disabled.scss';

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
  /** メモモードで入力ボタンを押下した際のイベント */
  onMemoInput?: (buttonText: string) => void;
};

export default function NumberButton({
  onMemoInput,
  onInput,
  completedNumbers,
  buttonNumber,
  isMemoMode,
  size,
}: Required<Props> & {
  buttonNumber: number;
  isMemoMode: boolean;
  size: number;
}) {
  const onClick = useCallback(
    () => (isMemoMode ? onMemoInput : onInput)(buttonNumber.toString()),
    [isMemoMode, onMemoInput, onInput, buttonNumber],
  );
  const disabled = useMemo(
    () =>
      size < buttonNumber || completedNumbers.includes(buttonNumber.toString()),
    [size, buttonNumber, completedNumbers],
  );
  const className = useMemo(
    () => getAnswerClass({ answer: buttonNumber.toString(), disabled }),
    [buttonNumber, disabled],
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

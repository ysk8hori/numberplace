import { BlockSize } from '@ysk8hori/numberplace-generator';
import React from 'react';
import InputPanelButton from './InputPanelButton';

/**
 * 答えを入力するための数字のパネルを表示する。
 *
 * 以下のことを実現する。
 * - その問題で入力する可能性のある数字のパネルを表示する
 * - ボタン押下時に押下したボタンのテキストを callback で親へ通知する
 */
const InputPanel: React.FC<{
  blockSize: BlockSize;
  onInput?: (buttonText: string) => void;
}> = ({ blockSize, onInput = () => undefined, ...rest }) => {
  const buttons = new Array(blockSize.height * blockSize.width)
    .fill(true)
    .map((_, index) => ++index)
    .map(buttonText => (
      <InputPanelButton
        data-testid={`input_${buttonText}`}
        onClick={() => onInput(buttonText.toString())}
      >
        {buttonText}
      </InputPanelButton>
    ));
  return (
    <div className="flex" {...rest}>
      {buttons}
    </div>
  );
};

export default InputPanel;

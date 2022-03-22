import { BlockSize } from '@ysk8hori/numberplace-generator';
import React from 'react';
import InputPanelButton from './InputPanelButton';

/**
 * 答えを入力するための数字のパネルを表示する。
 *
 * 以下のことを実現する。
 * - その問題で入力する可能性のある数字のパネルを表示する
 */
const InputPanel: React.FC<{
  blockSize: BlockSize;
}> = ({ blockSize, ...rest }) => {
  const buttons = new Array(blockSize.height * blockSize.width)
    .fill(true)
    .map((_, index) => ++index)
    .map(buttonText => (
      <InputPanelButton data-testid={`input_${buttonText}`}>
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

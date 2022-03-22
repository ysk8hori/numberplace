import { BlockSize } from '@ysk8hori/numberplace-generator';
import React, { useMemo } from 'react';
import InputPanelButton from './InputPanelButton';

/**
 * 答えを入力するための数字のパネルを表示する。
 *
 * 以下のことを実現する。
 * - 1〜9までの数字のボタンを表示する
 * - その問題で入力する可能性のある数字のパネルが押下可能
 * - ボタン押下時に押下したボタンのテキストを callback で親へ通知する
 * - 入力ボタンが６個以上並ぶ場合は横２列になる
 */
const InputPanel: React.FC<{
  /** ゲームのブロックサイズ */
  blockSize: BlockSize;
  /** 入力ボタンを押下した際のイベント */
  onInput?: (buttonText: string) => void;
}> = ({ blockSize, onInput = () => undefined, ...rest }) => {
  const size = blockSize.height * blockSize.width;
  const buttons = useMemo(
    () =>
      new Array(9)
        .fill(true)
        .map((_, index) => ++index)
        .map(buttonText => (
          <InputPanelButton
            data-testid={`input_${buttonText}`}
            onClick={() => onInput(buttonText.toString())}
            disabled={size < buttonText}
            key={buttonText}
          >
            {buttonText}
          </InputPanelButton>
        )),
    [size, onInput],
  );
  return (
    <div className={`grid grid-cols-5 gap-4`} {...rest}>
      {buttons}
    </div>
  );
};

export default InputPanel;

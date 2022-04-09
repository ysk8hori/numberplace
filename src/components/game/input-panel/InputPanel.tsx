import { BlockSize } from '@ysk8hori/numberplace-generator';
import React, { useMemo, useReducer } from 'react';
import ToggleMemoButton from './ToggleMemoButton';
import InputPanelButton from './InputPanelButton';
import { FaEraser } from 'react-icons/fa';

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
  /** 消去ボタンを押下した際のイベント */
  onDelete?: () => void;
  /** メモモードで入力ボタンを押下した際のイベント */
  onMemoInput?: (buttonText: string) => void;
};

/**
 * 答えを入力するための数字のパネルを表示する。
 *
 * 以下のことを実現する。
 * - 1〜9までの数字のボタンを表示する
 * - その問題で入力する可能性のある数字のパネルが押下可能
 * - ボタン押下時に押下したボタンのテキストを callback で親へ通知する
 * - 入力ボタンが６個以上並ぶ場合は横２列になる
 * - 消去ボタンを表示する
 * - 入力が完了した数字は入力不可とする
 * - トグルメモボタンでメモモードにできる
 */
const InputPanel: React.FC<Props> = ({
  blockSize,
  completedNumbers = [],
  onInput = () => undefined,
  onDelete = () => undefined,
  onMemoInput = () => undefined,
  ...rest
}) => {
  const size = blockSize.height * blockSize.width;
  const [isMemoMode, toggleMemoMode] = useReducer(
    isMemoMode => !isMemoMode,
    false,
  );
  const buttons = useMemo(
    () =>
      new Array(9)
        .fill(true)
        .map((_, index) => ++index)
        .map(buttonNumber => (
          <InputPanelButton
            data-testid={`input_${buttonNumber}`}
            onClick={() =>
              (isMemoMode ? onMemoInput : onInput)(buttonNumber.toString())
            }
            disabled={
              size < buttonNumber ||
              completedNumbers.includes(buttonNumber.toString())
            }
            key={buttonNumber}
          >
            {buttonNumber}
          </InputPanelButton>
        )),
    [size, onInput, isMemoMode],
  );
  return (
    <div className={`grid grid-cols-6 gap-4`} {...rest}>
      {buttons}
      <InputPanelButton
        data-testid={`btn_delete`}
        onClick={onDelete}
        aria-label="消す"
        className="row-start-1 row-end-3"
      >
        <FaEraser />
      </InputPanelButton>
      <ToggleMemoButton defaultChecked={isMemoMode} onClick={toggleMemoMode} />
    </div>
  );
};

export default InputPanel;

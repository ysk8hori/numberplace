import clsx from 'clsx';
import React, { ComponentProps } from 'react';
import NeumorphismButton from '../../atoms/NeumorphismButton';

type Props = ComponentProps<typeof NeumorphismButton>;

/**
 * 答えを入力するための数字のパネル1枚を表示する。
 *
 * 以下のことを実現する。
 * - 押下可能な数字のパネルを表示する
 * - ボタンの大きさに合わせたフォントのサイズで表示する
 */
function InputPanelButton({
  onClick,
  disabled,
  children,
  className,
  ...rest
}: Props) {
  return (
    <NeumorphismButton
      className={clsx('aspect-square w-full h-full rounded-2xl', className)}
      onClick={onClick}
      disabled={disabled}
      {...rest}
    >
      {children}
    </NeumorphismButton>
  );
}

export default InputPanelButton;

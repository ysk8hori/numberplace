import React, { useLayoutEffect, useRef, useState } from 'react';
import styled from 'styled-components';

/**
 * 答えを入力するための数字のパネル1枚を表示する。
 *
 * 以下のことを実現する。
 * - 押下可能な数字のパネルを表示する
 * - ボタンの大きさに合わせたフォントのサイズで表示する
 */
const InputPanelButton: React.FC<{
  /** クリック時イベント */
  onClick?: () => void;
  /** 非活性 */
  disabled?: boolean;
}> = ({ onClick, disabled, children, ...rest }) => {
  const button = useRef<HTMLButtonElement>(null);
  const [fontSize, setFontSize] = useState('1rem');
  useLayoutEffect(() => {
    if (button.current?.offsetWidth) {
      setFontSize(`${button.current.offsetWidth / 2}px`);
    }
  });
  return (
    <NewMorphizmButton
      ref={button}
      className="aspect-square w-full h-full rounded-full"
      style={{ fontSize }}
      onClick={onClick}
      disabled={disabled}
      {...rest}
    >
      {children}
    </NewMorphizmButton>
  );
};

const NewMorphizmButton = styled.button`
  box-shadow: -2px -2px 5px rgba(255, 255, 255, 1),
    3px 3px 5px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s;
  &:active {
    box-shadow: inset 2px 2px 5px rgba(0, 0, 0, 0.1),
      inset -3px -3px 5px rgba(255, 255, 255, 1);
  }
  &:disabled {
    box-shadow: inset 2px 2px 5px rgba(0, 0, 0, 0.1),
      inset -3px -3px 5px rgba(255, 255, 255, 1);
  }
  & + & {
    margin: 0px;
  }
`;

export default InputPanelButton;

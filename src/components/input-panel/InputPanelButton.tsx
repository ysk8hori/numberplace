import React, {
  ComponentProps,
  useContext,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { FontFamilyContext } from '../../contexts/fontContext';
import NeumorphismButton from '../atoms/NeumorphismButton';

type Props = ComponentProps<typeof NeumorphismButton>;

/**
 * 答えを入力するための数字のパネル1枚を表示する。
 *
 * 以下のことを実現する。
 * - 押下可能な数字のパネルを表示する
 * - ボタンの大きさに合わせたフォントのサイズで表示する
 */
const InputPanelButton: React.FC<Props> = ({
  onClick,
  disabled,
  children,
  ...rest
}) => {
  const button = useRef<HTMLButtonElement>(null);
  const fontContext = useContext(FontFamilyContext);
  const [fontSize, setFontSize] = useState('1rem');
  useLayoutEffect(() => {
    if (button.current?.offsetWidth) {
      setFontSize(`${button.current.offsetWidth / 1.5}px`);
    }
  });
  return (
    <NeumorphismButton
      ref={button}
      className="aspect-square w-full h-full rounded-2xl"
      style={{ fontSize, fontFamily: fontContext.inputButton }}
      onClick={onClick}
      disabled={disabled}
      {...rest}
    >
      {children}
    </NeumorphismButton>
  );
};

export default InputPanelButton;

import React, { useLayoutEffect, useRef, useState } from 'react';
import NeumorphismToggleButton from '../../atoms/NeumorphismToggleButton';
import { TiPencil } from 'react-icons/ti';

type Props = React.ComponentProps<typeof NeumorphismToggleButton>;

export default function ToggleMemoButton({
  onClick,
  defaultChecked,
  style,
  className,
}: Props) {
  const box = useRef<HTMLDivElement>(null);
  const [fontSize, setFontSize] = useState('1rem');
  useLayoutEffect(() => {
    if (box.current?.offsetWidth) {
      setFontSize(`${box.current.offsetWidth / 1.5}px`);
    }
  });
  return (
    <div ref={box}>
      <NeumorphismToggleButton
        onClick={onClick}
        defaultChecked={defaultChecked}
        style={{ ...style, fontSize }}
        className={className}
        aria-label="メモ"
      >
        <TiPencil />
      </NeumorphismToggleButton>
    </div>
  );
}

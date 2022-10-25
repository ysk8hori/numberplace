import React from 'react';
import ToggleButton from '../../atoms/ToggleButton';
import { TiPencil } from 'react-icons/ti';
import clsx from 'clsx';

type Props = React.ComponentProps<typeof ToggleButton>;

export default function ToggleMemoButton({
  onClick,
  defaultChecked,
  style,
  className,
}: Props) {
  return (
    <ToggleButton
      onClick={onClick}
      defaultChecked={defaultChecked}
      style={{ ...style }}
      className={clsx(
        'aspect-square w-full h-full rounded-lg flex justify-center items-center',
        className,
      )}
      aria-label="メモ"
    >
      <TiPencil style={{ width: '80%', height: '80%' }} />
    </ToggleButton>
  );
}

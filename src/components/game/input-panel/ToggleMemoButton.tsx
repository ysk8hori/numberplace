import React, { useLayoutEffect, useRef, useState } from 'react';
import NeumorphismToggleButton from '../../atoms/NeumorphismToggleButton';
import { TiPencil } from 'react-icons/ti';
import clsx from 'clsx';

type Props = React.ComponentProps<typeof NeumorphismToggleButton>;

export default function ToggleMemoButton({
  onClick,
  defaultChecked,
  style,
  className,
}: Props) {
  return (
    <NeumorphismToggleButton
      onClick={onClick}
      defaultChecked={defaultChecked}
      style={{ ...style }}
      className={clsx('aspect-square w-full h-full rounded-2xl', className)}
      aria-label="メモ"
    >
      <TiPencil style={{ width: '60%', height: '60%' }} />
    </NeumorphismToggleButton>
  );
}

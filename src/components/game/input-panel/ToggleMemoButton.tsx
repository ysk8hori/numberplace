import React from 'react';
import ToggleButton from '../../atoms/ToggleButton';
import clsx from 'clsx';
import { useRecoilState } from 'recoil';
import { atomOfInputMode } from '../../../pages/GameContainer/atoms';

type Props = React.ComponentProps<typeof ToggleButton>;

export default function ToggleMemoButton({ style, className }: Props) {
  const [mode, setMode] = useRecoilState(atomOfInputMode);
  return (
    <ToggleButton
      onChange={ev => setMode(ev.target.checked ? 'memo' : 'answer')}
      checked={mode === 'memo'}
      style={{ ...style }}
      className={clsx(
        'aspect-square w-full h-full rounded-lg flex justify-center items-center',
        className,
      )}
      aria-label="メモ"
    />
  );
}

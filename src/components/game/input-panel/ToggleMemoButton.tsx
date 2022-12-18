import React from 'react';
import ToggleButton from '../../atoms/ToggleButton';
import { TiPencil } from 'react-icons/ti';
import clsx from 'clsx';
import { useRecoilState } from 'recoil';
import { atomOfInputMode } from '../../../pages/GameContainer/atoms';

type Props = React.ComponentProps<typeof ToggleButton>;

export default function ToggleMemoButton({
  onClick: _onClick,
  defaultChecked: _defaultChecked,
  style,
  className,
}: Props) {
  const [mode, setMode] = useRecoilState(atomOfInputMode);
  const onClick = () => setMode(mode => (mode === 'memo' ? 'answer' : 'memo'));

  return (
    <ToggleButton
      onClick={onClick}
      defaultChecked={mode === 'memo'}
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

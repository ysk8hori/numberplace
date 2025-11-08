import clsx from 'clsx';
import React, { useMemo } from 'react';
import Button from '../../Button';
import './MenuButton.scss';

export default function MenuButton(props: {
  className?: string;
  onClick?: () => void;
  popovertarget?: string;
}) {
  const className = useMemo(
    () => clsx('rounded-full h-12 w-12 flex', props.className),
    [props.className],
  );
  return (
    <Button
      onClick={props.onClick}
      className={className}
      style={{ borderRadius: '9999px' }}
      popovertarget={props.popovertarget}
      aria-label="設定"
    >
      <div className="button-dots-vertical"></div>
    </Button>
  );
}

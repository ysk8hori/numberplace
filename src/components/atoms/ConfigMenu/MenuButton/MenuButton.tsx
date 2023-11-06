import clsx from 'clsx';
import React, { useMemo } from 'react';
import Button from '../../Button';
import './MenuButton.scss';

export default function MenuButton({
  className: _className,
  onClick,
}: {
  className?: string;
  onClick: () => void;
}) {
  const className = useMemo(
    () => clsx('rounded-full h-12 w-12 flex', _className),
    [_className],
  );
  return (
    <Button
      onClick={onClick}
      className={className}
      style={{ borderRadius: '9999px' }}
      aria-label="設定"
    >
      <div className="button-dots-vertical"></div>
    </Button>
  );
}

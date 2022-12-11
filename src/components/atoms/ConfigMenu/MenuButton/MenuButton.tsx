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
    () => clsx('rounded-full h-6 w-6 px-0', _className),
    [_className],
  );
  return (
    <Button onClick={onClick} className={className}>
      <span className="button-dots-vertical"></span>
    </Button>
  );
}

import clsx from 'clsx';
import React from 'react';

type Props = JSX.IntrinsicElements['button'];

/**
 * 汎用ボタン
 */
function Button({ onClick, disabled, children, className, ...rest }: Props) {
  return (
    <button
      className={clsx(
        'rounded-md border px-2',
        !disabled && 'bg-gray-100 active:bg-gray-200 hover:bg-gray-300',
        disabled ? 'border-gray-300' : 'border-gray-500',
        disabled ? 'text-gray-300' : 'text-gray-800',
        className,
      )}
      onClick={onClick}
      disabled={disabled}
      {...rest}
    >
      {children}
    </button>
  );
}

export default Button;

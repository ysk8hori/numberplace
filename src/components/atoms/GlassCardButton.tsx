import React from 'react';
import clsx from 'clsx';

type Props = React.ComponentProps<'button'>;

function GlassCardButton({ children, className, ...rest }: Props) {
  return (
    <button
      className={clsx(
        'block backdrop-blur-sm shadow-lg rounded-md bg-white/25 border-white/20 text-white',
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  );
}

export default GlassCardButton;

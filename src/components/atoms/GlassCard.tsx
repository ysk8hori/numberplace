import React from 'react';
import clsx from 'clsx';

type Props = React.ComponentProps<'div'>;

function GlassCard({ children, className, ...rest }: Props) {
  return (
    <div
      className={clsx(
        'backdrop-blur-sm shadow-lg rounded-md bg-white/25 border-white/20 text-white',
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
}

export default GlassCard;

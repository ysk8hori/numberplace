import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { useFontSize } from '../../utility-hooks/useFontSize';

export type Props = {
  beforeAfter?: [string | undefined, string | undefined];
  className?: string;
};

/**
 * ユーザーに、入力前の値と入力後の値を通知するパネル
 */
const InputNoticeLayer: React.FC<Props> = ({ beforeAfter, className }) => {
  const { boxRef, fontSize } = useFontSize();
  const [class0, setClass0] = useState('hidden');
  const [class1, setClass1] = useState('hidden');
  if (!beforeAfter) {
    return null;
  }
  useEffect(() => {
    setClass0('hidden');
    setClass1('hidden');
  }, [beforeAfter]);
  useEffect(() => {
    if (beforeAfter[0] === beforeAfter[1]) return;
    const id = setTimeout(() => {
      if (beforeAfter[0] === undefined) {
        setClass1('slideIn');
      } else {
        setClass0('slideOut');
        setClass1('slideInLate');
      }
    }, 1);
    return () => clearTimeout(id);
  }, [beforeAfter]);
  useEffect(() => {
    const id = setTimeout(() => {
      setClass0('hidden');
      setClass1('hidden');
    }, 1500);
    return () => clearTimeout(id);
  }, [beforeAfter]);

  return (
    <div
      ref={boxRef}
      className={clsx('w-full h-full aspect-square', className)}
      style={{ fontSize }}
    >
      <BeforeAfter className={class0}>{beforeAfter[0]}</BeforeAfter>
      <BeforeAfter className={class1}>{beforeAfter[1]}</BeforeAfter>
      {/* <BeforeAfter className="slideOut">{beforeAfter[0]}</BeforeAfter>
      <BeforeAfter className="slideIn">{beforeAfter[1]}</BeforeAfter> */}
    </div>
  );
};

const BeforeAfter: React.FC<React.ComponentProps<'div'>> = ({
  className,
  children,
  ...rest
}) => {
  return (
    <div
      className={clsx(
        'w-full h-full flex justify-center items-center select-none absolute top-0 left-0 text-gray-400',
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
};

export default InputNoticeLayer;

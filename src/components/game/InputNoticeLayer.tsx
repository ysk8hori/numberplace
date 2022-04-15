import React, { useMemo } from 'react';
import clsx from 'clsx';

type Props = {
  beforeAfter: [string, string];
  className: string;
};

/**
 * ユーザーに、入力前の値と入力後の値を通知するパネル
 */
const InputNoticeLayer: React.FC<Props> = ({ beforeAfter, className }) => {
  return (
    <div className={clsx(className)}>
      <div>{beforeAfter[0]}</div>
      <div>{beforeAfter[1]}</div>
    </div>
  );
};

export default InputNoticeLayer;

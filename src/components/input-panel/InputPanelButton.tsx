import React, {
  PropsWithChildren,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

/**
 * 答えを入力するための数字のパネル1枚を表示する。
 *
 * 以下のことを実現する。
 * - 押下可能な数字のパネルを表示する
 */
export default function InputPanelButton({
  answerString,
  ...rest
}: PropsWithChildren<{
  answerString: string;
}>) {
  return <button {...rest}>{answerString}</button>;
}

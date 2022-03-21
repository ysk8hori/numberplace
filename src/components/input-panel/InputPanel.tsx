import { BlockSize } from '@ysk8hori/numberplace-generator';
import React, {
  PropsWithChildren,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

/**
 * 答えを入力するための数字のパネルを表示する。
 *
 * 以下のことを実現する。
 * - その問題で入力する可能性のある数字のパネルを表示する
 */
export default function InputPanel({
  blockSize,
  ...rest
}: PropsWithChildren<{
  blockSize: BlockSize;
}>) {
  return (
    <div {...rest}>
      <button data-testid="input_1">1</button>
      <button data-testid="input_2">2</button>
      <button data-testid="input_3">3</button>
      <button data-testid="input_4">4</button>
    </div>
  );
}

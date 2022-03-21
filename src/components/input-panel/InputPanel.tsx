import { BlockSize } from '@ysk8hori/numberplace-generator';
import React, {
  PropsWithChildren,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import styled from 'styled-components';
import InputPanelButton from './InputPanelButton';

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
    <div className="flex" {...rest}>
      <InputPanelButton data-testid="input_1">1</InputPanelButton>
      <InputPanelButton data-testid="input_2">2</InputPanelButton>
      <InputPanelButton data-testid="input_3">3</InputPanelButton>
      <InputPanelButton data-testid="input_4">4</InputPanelButton>
    </div>
  );
}

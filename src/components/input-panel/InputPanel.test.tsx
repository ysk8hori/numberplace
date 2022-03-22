import '@testing-library/jest-dom';
import React from 'react';
import { describe, test, expect, fn } from 'vitest';
import { render, screen, userEvent } from '../../utils/test-utils';
import InputPanel from './InputPanel';
import { blockSize_2_2 } from '../../utils/test-utils';

describe('InputPanel', () => {
  test('その問題で入力する可能性のある数字のパネルを表示する', () => {
    render(<InputPanel blockSize={blockSize_2_2} />);
    expect(screen.getByTestId('input_1')).toHaveTextContent('1');
    expect(screen.getByTestId('input_2')).toHaveTextContent('2');
    expect(screen.getByTestId('input_3')).toHaveTextContent('3');
    expect(screen.getByTestId('input_4')).toHaveTextContent('4');
    expect(screen.queryByTestId('input_5')).not.toBeInTheDocument();
  });
  test('ボタン押下時に押下したボタンのテキストを callback で親へ通知する', () => {
    const onInput = fn();
    render(<InputPanel blockSize={blockSize_2_2} onInput={onInput} />);
    userEvent.click(screen.getByRole('button', { name: '1' }));
    expect(onInput).toHaveBeenCalledWith('1');
  });
});

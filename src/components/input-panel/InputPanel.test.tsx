import '@testing-library/jest-dom';
import React from 'react';
import { describe, test, expect, fn } from 'vitest';
import { render, screen, userEvent } from '../../utils/test-utils';
import InputPanel from './InputPanel';
import { blockSize_2_2 } from '../../utils/test-utils';

describe('InputPanel', () => {
  test('その問題で入力する可能性のある数字のパネルと消去ボタンが押下可能', () => {
    render(<InputPanel blockSize={blockSize_2_2} />);
    expect(screen.getByTestId('input_1')).toBeEnabled();
    expect(screen.getByTestId('input_2')).toBeEnabled();
    expect(screen.getByTestId('input_3')).toBeEnabled();
    expect(screen.getByTestId('input_4')).toBeEnabled();
    expect(screen.getByTestId('input_5')).toBeDisabled();
    expect(screen.getByTestId('input_6')).toBeDisabled();
    expect(screen.getByTestId('input_7')).toBeDisabled();
    expect(screen.getByTestId('input_8')).toBeDisabled();
    expect(screen.getByTestId('input_9')).toBeDisabled();
    expect(screen.getByTestId('btn_delete')).toBeEnabled();
  });
  test('ボタン押下時に押下したボタンのテキストを callback で親へ通知する', () => {
    const onInput = fn();
    render(<InputPanel blockSize={blockSize_2_2} onInput={onInput} />);
    userEvent.click(screen.getByRole('button', { name: '1' }));
    expect(onInput).toHaveBeenCalledWith('1');
  });
  test('消去ボタン押下時には onDelete で親へ通知する', () => {
    const onDelete = fn();
    render(<InputPanel blockSize={blockSize_2_2} onDelete={onDelete} />);
    userEvent.click(screen.getByRole('button', { name: '消す' }));
    expect(onDelete).toHaveBeenCalledTimes(1);
  });
  test('入力が完了した数字は入力不可とする', () => {
    render(<InputPanel blockSize={blockSize_2_2} completedNumbers={['2']} />);
    expect(screen.getByTestId('input_1')).toBeEnabled();
    expect(screen.getByTestId('input_2')).toBeDisabled(); // 入力が完了している
    expect(screen.getByTestId('input_3')).toBeEnabled();
    expect(screen.getByTestId('input_4')).toBeEnabled();
    expect(screen.getByTestId('input_5')).toBeDisabled();
    expect(screen.getByTestId('input_6')).toBeDisabled();
    expect(screen.getByTestId('input_7')).toBeDisabled();
    expect(screen.getByTestId('input_8')).toBeDisabled();
    expect(screen.getByTestId('input_9')).toBeDisabled();
    expect(screen.getByTestId('btn_delete')).toBeEnabled();
  });
});

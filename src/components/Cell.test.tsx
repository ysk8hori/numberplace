import '@testing-library/jest-dom';
import React from 'react';
import { describe, test, it, expect, fn } from 'vitest';
import { render, screen, userEvent } from '../utils/test-utils';
import Cell from './Cell';

describe('Cell', () => {
  test('Cell は answer を表示する', () => {
    render(<Cell answer={'2'} />);
    expect(screen.getByText('2')).toBeInTheDocument();
  });
  test('Cell は answer がない場合は空欄になる', () => {
    render(<Cell answer={undefined} />);
    expect(screen.queryByText(/[0-9]/)).not.toBeInTheDocument();
  });
  test('Cell は click 可能である', () => {
    const onSelect = fn();
    render(<Cell answer={'2'} onSelect={onSelect} />);
    userEvent.click(screen.getByText('2'));
    expect(onSelect).toHaveBeenCalled();
  });
  test('選択中の Cell には data-select 属性が付く', () => {
    render(<Cell data-testid="cell" select />);
    expect(screen.getByTestId('cell')).toHaveAttribute('data-select');
    render(<Cell data-testid="cell2" />);
    expect(screen.getByTestId('cell2')).not.toHaveAttribute('data-select');
  });
  test('変更できない Cell には data-fix 属性が付く', () => {
    render(<Cell data-testid="cell" fix />);
    expect(screen.getByTestId('cell')).toHaveAttribute('data-fix');
  });
});

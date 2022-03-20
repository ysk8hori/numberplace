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
});

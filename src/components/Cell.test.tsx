import '@testing-library/jest-dom';
import React from 'react';
import { describe, test, it, expect } from 'vitest';
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
  test('Cell は right を指定すると右側のボーダーが濃くなる', () => {
    render(<Cell answer={undefined} right data-testid="cell" />);
    expect(screen.queryByTestId('cell')).toHaveClass(
      'border-r-2 border-r-black',
    );
  });
});

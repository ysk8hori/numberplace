import '@testing-library/jest-dom';
import React from 'react';
import { describe, test, expect, vi } from 'vitest';
import {
  blockSize_2_2,
  render,
  screen,
  userEvent,
} from '../../../utils/test-utils';
import Cell from './Cell';

describe('Cell', () => {
  test('Cell は answer を表示する', () => {
    render(<Cell answer={'2'} />);
    expect(screen.getByRole('img', { name: 'answer 2' })).toBeInTheDocument();
  });
  test('Cell は answer がない場合は空欄になる', () => {
    render(<Cell answer={undefined} />);
    expect(
      screen.queryByRole('img', { name: /[0-9]/ }),
    ).not.toBeInTheDocument();
  });
  test('Cell は click 可能である', async () => {
    const onSelect = vi.fn();
    render(<Cell answer={'2'} onSelect={onSelect} />);
    await userEvent.click(screen.getByRole('img', { name: 'answer 2' }));
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
  test('Cell はメモした内容を表示する', () => {
    render(<Cell blockSize={blockSize_2_2} memoList={['1', '4']} />);
    expect(
      screen.getByRole('img', { name: 'answer candidate 1' }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole('img', { name: 'answer candidate 2' }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole('img', { name: 'answer candidate 3' }),
    ).not.toBeInTheDocument();
    expect(
      screen.getByRole('img', { name: 'answer candidate 4' }),
    ).toBeInTheDocument();
  });
  test('Cell はメモより答えを優先して表示する', () => {
    render(<Cell blockSize={blockSize_2_2} memoList={['1', '4']} answer="3" />);
    expect(
      screen.queryByRole('img', { name: 'answer candidate 1' }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole('img', { name: 'answer candidate 2' }),
    ).not.toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'answer 3' })).toBeInTheDocument();
    expect(
      screen.queryByRole('img', { name: 'answer candidate 4' }),
    ).not.toBeInTheDocument();
  });
});

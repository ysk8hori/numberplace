import '@testing-library/jest-dom';
import React from 'react';
import { describe, test, it, expect, fn } from 'vitest';
import { render, screen, userEvent } from '../../../utils/test-utils';
import MemoLayer from './MemoLayer';
import { blockSize_2_2, blockSize_3_3 } from '../../../utils/test-utils';

test('MemoLayer はメモした内容を表示する', () => {
  render(<MemoLayer blockSize={blockSize_2_2} memoList={['1', '4']} />);
  expect(screen.getByText('1')).toBeInTheDocument();
  expect(screen.queryByText('2')).not.toBeInTheDocument();
  expect(screen.queryByText('3')).not.toBeInTheDocument();
  expect(screen.getByText('4')).toBeInTheDocument();
});

test('MemoLayer はメモがなければ何も表示しない', () => {
  render(<MemoLayer blockSize={blockSize_2_2} memoList={[]} />);
  expect(screen.queryByText('1')).not.toBeInTheDocument();
  expect(screen.queryByText('2')).not.toBeInTheDocument();
  expect(screen.queryByText('3')).not.toBeInTheDocument();
  expect(screen.queryByText('4')).not.toBeInTheDocument();
});

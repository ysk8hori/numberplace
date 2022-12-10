import '@testing-library/jest-dom';
import React from 'react';
import { test, expect } from 'vitest';
import { render, screen } from '../../../utils/test-utils';
import MemoLayer from './MemoLayer';
import { blockSize_2_2 } from '../../../utils/test-utils';

test('MemoLayer はメモした内容を表示する', () => {
  render(<MemoLayer blockSize={blockSize_2_2} memoList={['1', '4']} />);
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

test('MemoLayer はメモがなければ何も表示しない', () => {
  render(<MemoLayer blockSize={blockSize_2_2} memoList={[]} />);
  expect(
    screen.queryByRole('img', { name: 'answer candidate 1' }),
  ).not.toBeInTheDocument();
  expect(
    screen.queryByRole('img', { name: 'answer candidate 2' }),
  ).not.toBeInTheDocument();
  expect(
    screen.queryByRole('img', { name: 'answer candidate 3' }),
  ).not.toBeInTheDocument();
  expect(
    screen.queryByRole('img', { name: 'answer candidate 4' }),
  ).not.toBeInTheDocument();
});

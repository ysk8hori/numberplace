import '@testing-library/jest-dom';
import React from 'react';
import { test, expect } from 'vitest';
import { render, screen } from '../../utils/test-utils';
import MistakeNoticeModal from './MistakeNoticeModal';

test('mistake を渡さない場合は何も表示しない', async () => {
  render(<MistakeNoticeModal />);
  expect(
    screen.queryByRole('dialog', { name: '不正解です' }),
  ).not.toBeInTheDocument();
});
test('mistake を渡すとモーダルを表示する', async () => {
  render(<MistakeNoticeModal mistake />);
  expect(
    screen.queryByRole('dialog', { name: '不正解です' }),
  ).toBeInTheDocument();
});
test('mistake を渡すとモーダルに「間違いがあります」を表示する', async () => {
  render(<MistakeNoticeModal mistake />);
  expect(
    screen.queryByRole('dialog', { name: '不正解です' }),
  ).toHaveTextContent('間違いがあります');
});

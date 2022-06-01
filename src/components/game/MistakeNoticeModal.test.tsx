import '@testing-library/jest-dom';
import React from 'react';
import { test, expect } from 'vitest';
import { render, screen } from '../../utils/test-utils';
import MistakeNoticeModal from './MistakeNoticeModal';

test('mistake も emptycell も渡さない場合は何も表示しない', async () => {
  render(<MistakeNoticeModal />);
  expect(
    screen.queryByRole('dialog', { name: '不正解です' }),
  ).not.toBeInTheDocument();
});
test('mistake か emptycell を渡すとモーダルを表示する', async () => {
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
test('emptycell を渡すとモーダルに「間違いがあります」を表示する', async () => {
  render(<MistakeNoticeModal emptycell />);
  expect(
    screen.queryByRole('dialog', { name: '不正解です' }),
  ).toHaveTextContent('ぜんぶ こたえてね');
});
test('mistake と emptycell を両方渡すとモーダルに「間違いがあります」と「ぜんぶ こたえてね」を表示する', async () => {
  render(<MistakeNoticeModal mistake emptycell />);
  expect(
    screen.queryByRole('dialog', { name: '不正解です' }),
  ).toHaveTextContent('間違いがあります');
  expect(
    screen.queryByRole('dialog', { name: '不正解です' }),
  ).toHaveTextContent('ぜんぶ こたえてね');
});

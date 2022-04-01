import '@testing-library/jest-dom';
import React from 'react';
import { test, fn, expect } from 'vitest';
import { render, screen, userEvent, waitFor } from '../../utils/test-utils';
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
test('mistake を渡すとモーダルに「まちがいが あるよ」を表示する', async () => {
  render(<MistakeNoticeModal mistake />);
  expect(
    screen.queryByRole('dialog', { name: '不正解です' }),
  ).toHaveTextContent('まちがいが あるよ');
});
test('emptycell を渡すとモーダルに「まちがいが あるよ」を表示する', async () => {
  render(<MistakeNoticeModal emptycell />);
  expect(
    screen.queryByRole('dialog', { name: '不正解です' }),
  ).toHaveTextContent('ぜんぶ こたえてね');
});
test('mistake と emptycell を両方渡すとモーダルに「まちがいが あるよ」と「ぜんぶ こたえてね」を表示する', async () => {
  render(<MistakeNoticeModal mistake emptycell />);
  expect(
    screen.queryByRole('dialog', { name: '不正解です' }),
  ).toHaveTextContent('まちがいが あるよ');
  expect(
    screen.queryByRole('dialog', { name: '不正解です' }),
  ).toHaveTextContent('ぜんぶ こたえてね');
});

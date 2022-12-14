import '@testing-library/jest-dom';
import React from 'react';
import { test, expect } from 'vitest';
import { render, screen } from '../../utils/test-utils';
import MistakeNoticeModal from './MistakeNoticeModal';

test('モーダルに「間違いがあります」を表示する', async () => {
  render(<MistakeNoticeModal />);
  expect(
    screen.queryByRole('dialog', { name: '不正解です' }),
  ).toHaveTextContent('間違いがあります');
});

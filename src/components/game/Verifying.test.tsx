import '@testing-library/jest-dom';
import React from 'react';
import { test, vi, expect } from 'vitest';
import { render, screen, userEvent, waitFor } from '../../utils/test-utils';
import Verifying from './Verifying';

test('「答え合わせ」ボタンを押下すると onStartChecking イベントが実行される', async () => {
  const onStartChecking = vi.fn();
  render(<Verifying onStartChecking={onStartChecking} />);
  await userEvent.click(screen.getByRole('button', { name: '答え合わせ' }));
  expect(onStartChecking).toHaveBeenCalled();
});

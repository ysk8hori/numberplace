import '@testing-library/jest-dom';
import React from 'react';
import { test, vi, expect } from 'vitest';
import { render, screen, userEvent, waitFor } from '../../utils/test-utils';
import Verifying from './Verifying';

test('ボタンクリックで答え合わせ確認モーダルを表示する', async () => {
  render(<Verifying />);
  await userEvent.click(screen.getByRole('button', { name: '答え 合わせ' }));
  expect(await screen.findByRole('dialog', { name: '答え合わせの確認' }));
});

test('モーダルの「いいえ」ボタンを押下するとモーダルを閉じる', async () => {
  render(<Verifying />);
  await userEvent.click(screen.getByRole('button', { name: '答え 合わせ' }));
  expect(await screen.findByRole('dialog', { name: '答え合わせの確認' }));
  await userEvent.click(screen.getByRole('button', { name: 'いいえ' }));
  await waitFor(() =>
    expect(screen.queryByRole('dialog', { name: '答え合わせの確認' })),
  );
});

test('モーダルの「はい」ボタンを押下するとモーダルを閉じる', async () => {
  const onStartChecking = vi.fn();
  render(<Verifying onStartChecking={onStartChecking} />);
  await userEvent.click(screen.getByRole('button', { name: '答え 合わせ' }));
  expect(await screen.findByRole('dialog', { name: '答え合わせの確認' }));
  await userEvent.click(screen.getByRole('button', { name: 'はい' }));
  await waitFor(() =>
    expect(screen.queryByRole('dialog', { name: '答え合わせの確認' })),
  );
});

test('モーダルの「はい」ボタンを押下すると onStartChecking イベントが実行される', async () => {
  const onStartChecking = vi.fn();
  render(<Verifying onStartChecking={onStartChecking} />);
  await userEvent.click(screen.getByRole('button', { name: '答え 合わせ' }));
  expect(await screen.findByRole('dialog', { name: '答え合わせの確認' }));
  await userEvent.click(screen.getByRole('button', { name: 'はい' }));
  expect(onStartChecking).toHaveBeenCalled();
});

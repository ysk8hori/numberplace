import '@testing-library/jest-dom';
import React from 'react';
import { test, fn, expect } from 'vitest';
import { render, screen, userEvent, waitFor } from '../../utils/test-utils';
import Verifying from './Verifying';

test('ボタンクリックでこたえあわせ確認モーダルを表示する', async () => {
  render(<Verifying />);
  userEvent.click(screen.getByRole('button', { name: 'こたえあわせ' }));
  expect(await screen.findByRole('dialog', { name: '答え合わせの確認' }));
});

test('モーダルの「いいえ」ボタンを押下するとモーダルを閉じる', async () => {
  render(<Verifying />);
  userEvent.click(screen.getByRole('button', { name: 'こたえあわせ' }));
  expect(await screen.findByRole('dialog', { name: '答え合わせの確認' }));
  userEvent.click(screen.getByRole('button', { name: 'いいえ' }));
  await waitFor(() =>
    expect(screen.queryByRole('dialog', { name: '答え合わせの確認' })),
  );
});

test('モーダルの「はい」ボタンを押下するとモーダルを閉じる', async () => {
  const onStartChecking = fn();
  render(<Verifying onStartChecking={onStartChecking} />);
  userEvent.click(screen.getByRole('button', { name: 'こたえあわせ' }));
  expect(await screen.findByRole('dialog', { name: '答え合わせの確認' }));
  userEvent.click(screen.getByRole('button', { name: 'はい' }));
  await waitFor(() =>
    expect(screen.queryByRole('dialog', { name: '答え合わせの確認' })),
  );
});

test('モーダルの「はい」ボタンを押下すると onStartChecking イベントが実行される', async () => {
  const onStartChecking = fn();
  render(<Verifying onStartChecking={onStartChecking} />);
  userEvent.click(screen.getByRole('button', { name: 'こたえあわせ' }));
  expect(await screen.findByRole('dialog', { name: '答え合わせの確認' }));
  userEvent.click(screen.getByRole('button', { name: 'はい' }));
  expect(onStartChecking).toHaveBeenCalled();
});

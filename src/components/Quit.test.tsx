import '@testing-library/jest-dom';
import React from 'react';
import { test, fn, expect } from 'vitest';
import { render, screen, userEvent, waitFor } from '../utils/test-utils';
import Quit from './Quit';

test('ボタンクリックでゲームをやめる確認モーダルを表示する', async () => {
  render(<Quit />);
  userEvent.click(screen.getByRole('button', { name: 'ゲームをやめる' }));
  expect(await screen.findByRole('dialog', { name: 'ゲームをやめる確認' }));
});

test('モーダルの「いいえ」ボタンを押下するとモーダルを閉じる', async () => {
  render(<Quit />);
  userEvent.click(screen.getByRole('button', { name: 'ゲームをやめる' }));
  expect(await screen.findByRole('dialog', { name: 'ゲームをやめる確認' }));
  userEvent.click(screen.getByRole('button', { name: 'いいえ' }));
  await waitFor(() =>
    expect(screen.queryByRole('dialog', { name: 'ゲームをやめる確認' })),
  );
});

test('モーダルの「はい」ボタンを押下するとモーダルを閉じる', async () => {
  render(<Quit />);
  userEvent.click(screen.getByRole('button', { name: 'ゲームをやめる' }));
  expect(await screen.findByRole('dialog', { name: 'ゲームをやめる確認' }));
  userEvent.click(screen.getByRole('button', { name: 'はい' }));
  await waitFor(() =>
    expect(screen.queryByRole('dialog', { name: 'ゲームをやめる確認' })),
  );
});

test('モーダルの「はい」ボタンを押下すると onQuit イベントが実行される', async () => {
  const onQuit = fn();
  render(<Quit onQuit={onQuit} />);
  userEvent.click(screen.getByRole('button', { name: 'ゲームをやめる' }));
  expect(await screen.findByRole('dialog', { name: 'ゲームをやめる確認' }));
  userEvent.click(screen.getByRole('button', { name: 'はい' }));
  expect(onQuit).toHaveBeenCalled();
});

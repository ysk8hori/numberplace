import '@testing-library/jest-dom';
import React from 'react';
import { render, screen, userEvent, waitFor } from '../../utils/test-utils';
import Quit from './Quit';

// popover APIはJSDOMでサポートされていないため、これらのテストはスキップ
// 今後、jsdomを使わないテスト環境に移行する予定
test.skip('ボタンクリックでゲームをやめる確認モーダルを表示する', async () => {
  render(<Quit />);
  await userEvent.click(screen.getByRole('button', { name: 'ゲームをやめる' }));
  expect(await screen.findByRole('dialog', { name: 'ゲームをやめる確認' }));
});

test.skip('モーダルの「いいえ」ボタンを押下するとモーダルを閉じる', async () => {
  render(<Quit />);
  await userEvent.click(screen.getByRole('button', { name: 'ゲームをやめる' }));
  expect(await screen.findByRole('dialog', { name: 'ゲームをやめる確認' }));
  await userEvent.click(screen.getByRole('button', { name: 'いいえ' }));
  await waitFor(() =>
    expect(screen.queryByRole('dialog', { name: 'ゲームをやめる確認' })),
  );
});

test.skip('モーダルの「はい」ボタンを押下するとモーダルを閉じる', async () => {
  render(<Quit />);
  await userEvent.click(screen.getByRole('button', { name: 'ゲームをやめる' }));
  expect(await screen.findByRole('dialog', { name: 'ゲームをやめる確認' }));
  await userEvent.click(screen.getByRole('button', { name: 'はい' }));
  await waitFor(() =>
    expect(screen.queryByRole('dialog', { name: 'ゲームをやめる確認' })),
  );
});

test.skip('モーダルの「はい」ボタンを押下すると onQuit イベントが実行される', async () => {
  const onQuit = vi.fn();
  render(<Quit onQuit={onQuit} />);
  await userEvent.click(screen.getByRole('button', { name: 'ゲームをやめる' }));
  expect(await screen.findByRole('dialog', { name: 'ゲームをやめる確認' }));
  await userEvent.click(screen.getByRole('button', { name: 'はい' }));
  expect(onQuit).toHaveBeenCalled();
});

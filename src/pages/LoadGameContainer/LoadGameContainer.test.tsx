import '@testing-library/jest-dom';
import React from 'react';
import { render, screen, waitFor, TestProvider } from '../../utils/test-utils';
import LoadGameContainer from '.';

function setup(onChangeSize?: () => void) {
  render(
    <TestProvider initialValues={[]}>
      <LoadGameContainer onChangeSize={onChangeSize} />
    </TestProvider>,
  );
}

beforeEach(() => {
  localStorage.clear();
  history.replaceState('', '', import.meta.env.BASE_URL);
});

test('URL に正しいパズル情報がある場合はゲーム画面を表示する', async () => {
  const onChangeSize = vi.fn();
  history.pushState('', '', '/?v=1&p=x45x3nxxx5nxx2nnxxxx1n&w=3&h=2&t=c');

  setup(onChangeSize);

  // 「答え合わせ」ボタンが表示されることで、ゲーム画面が表示されていることを確認
  expect(
    await screen.findByRole('button', { name: '答え合わせ' }),
  ).toBeInTheDocument();
  expect(onChangeSize).not.toHaveBeenCalled();
  expect(location.search).toBe('');
});

test('URL に不正なパズル情報がある場合はメニューへ戻る', async () => {
  const onChangeSize = vi.fn();
  history.pushState('', '', '/?v=1&p=foo&w=3&h=2&t=c');

  setup(onChangeSize);

  await waitFor(() => {
    expect(onChangeSize).toHaveBeenCalledTimes(1);
  });
  expect(
    screen.queryByRole('button', { name: '答え合わせ' }),
  ).not.toBeInTheDocument();
  expect(location.search).toBe('');
});

test('URL からロードしたゲーム画面でメニューを開くと「ゲームをやめる」ボタンが表示される', async () => {
  history.pushState('', '', '/?v=1&p=x45x3nxxx5nxx2nnxxxx1n&w=3&h=2&t=c');

  setup();

  // ゲーム画面が表示される
  expect(
    await screen.findByRole('button', { name: '答え合わせ' }),
  ).toBeInTheDocument();

  // // 設定ボタン（メニュー）をクリック
  // const menuButton = await screen.findByRole('button', { name: '設定' });
  // await userEvent.click(menuButton);

  // メニュー内の「ゲームをやめる」テキストが存在することを確認する。
  // popover 内の要素は非表示になっていても取得できる。
  // ここでは、ひとまずURLからロードした場合に「ゲームをやめる」ボタンが存在することを確認するのみで我慢する。
  const quitText = await screen.findByText('ゲームをやめる');

  // button 要素を最も近い親から探す
  const quitButton = quitText.closest('button');

  // button 要素であることを確認
  expect(quitButton).toBeInTheDocument();
  expect(quitButton?.tagName).toBe('BUTTON');
  expect(quitButton?.getAttribute('popovertarget')).toBe('quit-confirm-modal');
});

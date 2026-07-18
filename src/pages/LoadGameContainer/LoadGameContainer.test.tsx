import '@testing-library/jest-dom';
import React from 'react';
import { render, screen, waitFor, TestProvider } from '../../utils/test-utils';
import LoadGameContainer from '.';

vi.mock('../GameContainer', () => ({
  default: () => <div data-testid="game-container" />,
}));

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

  expect(await screen.findByTestId('game-container')).toBeInTheDocument();
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
  expect(screen.queryByTestId('game-container')).not.toBeInTheDocument();
  expect(location.search).toBe('');
});

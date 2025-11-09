import '@testing-library/jest-dom';
import React from 'react';
import { render, screen, userEvent } from '../../utils/test-utils';
import GameClearModal from './GameClearModal';

// dialog API のモック
// テスト環境では dialog 要素の showModal/close メソッドがサポートされていないため、モック化する
beforeEach(() => {
  HTMLDialogElement.prototype.showModal = vi.fn(function (
    this: HTMLDialogElement,
  ) {
    this.open = true;
  });
  HTMLDialogElement.prototype.close = vi.fn(function (this: HTMLDialogElement) {
    this.open = false;
  });
});

afterEach(() => {
  vi.restoreAllMocks();
});

test('game clear すると表示する', async () => {
  render(<GameClearModal />);
  expect(screen.getByText('クリア🎉')).toBeInTheDocument();
});

test('同じ大きさで遊ぶ押下コールバックが呼ばれる', async () => {
  const onRegenerate = vi.fn();
  render(<GameClearModal onRegenerate={onRegenerate} />);
  await userEvent.click(
    screen.getByRole('button', { name: '同じ大きさで遊ぶ' }),
  );
  expect(onRegenerate).toHaveBeenCalled();
});

test('他の大きさで遊ぶ押下コールバックが呼ばれる', async () => {
  const onChangeSize = vi.fn();
  render(<GameClearModal onChangeSize={onChangeSize} />);
  await userEvent.click(
    screen.getByRole('button', { name: '他の大きさで遊ぶ' }),
  );
  expect(onChangeSize).toHaveBeenCalled();
});

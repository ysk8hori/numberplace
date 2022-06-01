import '@testing-library/jest-dom';
import React from 'react';
import { test, vi, expect } from 'vitest';
import { render, screen, userEvent } from '../../utils/test-utils';
import GameClearModal from './GameClearModal';

test('game clear していない場合は何も表示しない', async () => {
  render(<GameClearModal />);
  expect(
    screen.queryByRole('dialog', { name: 'クリア' }),
  ).not.toBeInTheDocument();
});

test('game clear すると表示する', async () => {
  render(<GameClearModal gameClear />);
  expect(screen.queryByRole('dialog', { name: 'クリア' })).toBeInTheDocument();
});

test('同じ大きさで遊ぶ押下コールバックが呼ばれる', async () => {
  const onRegenerate = vi.fn();
  render(<GameClearModal gameClear onRegenerate={onRegenerate} />);
  await userEvent.click(
    screen.getByRole('button', { name: '同じ 大きさで 遊ぶ' }),
  );
  expect(onRegenerate).toHaveBeenCalled();
});

test('他の大きさで遊ぶ押下コールバックが呼ばれる', async () => {
  const onChangeSize = vi.fn();
  render(<GameClearModal gameClear onChangeSize={onChangeSize} />);
  await userEvent.click(
    screen.getByRole('button', { name: '他の 大きさで 遊ぶ' }),
  );
  expect(onChangeSize).toHaveBeenCalled();
});

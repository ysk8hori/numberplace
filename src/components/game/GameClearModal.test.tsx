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

test('おなじおおきさであそぶ押下コールバックが呼ばれる', async () => {
  const onRegenerate = vi.fn();
  render(<GameClearModal gameClear onRegenerate={onRegenerate} />);
  userEvent.click(
    screen.getByRole('button', { name: 'おなじ おおきさで あそぶ' }),
  );
  expect(onRegenerate).toHaveBeenCalled();
});

test('ほかのおおきさであそぶ押下コールバックが呼ばれる', async () => {
  const onChangeSize = vi.fn();
  render(<GameClearModal gameClear onChangeSize={onChangeSize} />);
  userEvent.click(
    screen.getByRole('button', { name: 'ほかの おおきさで あそぶ' }),
  );
  expect(onChangeSize).toHaveBeenCalled();
});

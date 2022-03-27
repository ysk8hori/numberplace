import '@testing-library/jest-dom';
import React from 'react';
import { test, fn, expect } from 'vitest';
import { render, screen, userEvent, waitFor } from '../utils/test-utils';
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
  const onRegenerate = fn();
  render(<GameClearModal gameClear onRegenerate={onRegenerate} />);
  userEvent.click(
    screen.getByRole('button', { name: 'おなじ おおきさで あそぶ' }),
  );
  expect(onRegenerate).toHaveBeenCalled();
});

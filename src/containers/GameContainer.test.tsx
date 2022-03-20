import '@testing-library/jest-dom';
import React from 'react';
import { describe, test, fn, expect } from 'vitest';
import {
  render,
  screen,
  userEvent,
  puzzle_2_2 as puzzle,
  blockSize_2_2 as blockSize,
} from '../utils/test-utils';
import GameContainer from './GameContainer';

describe('GameContainer', () => {
  test('ゲーム初期表示時の選択中セルは 0,0', () => {
    render(<GameContainer puzzle={puzzle} blockSize={blockSize} />);
    expect(screen.getByTestId('0,0')).toHaveAttribute('data-select', 'true');
    expect(screen.getByTestId('0,1')).toHaveAttribute('data-select', 'false');
  });
});

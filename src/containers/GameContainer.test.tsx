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
  test('クリックしたセルを選択中にする', () => {
    render(<GameContainer puzzle={puzzle} blockSize={blockSize} />);
    expect(screen.getByTestId('0,0')).toHaveAttribute('data-select', 'true');
    expect(screen.getByTestId('2,2')).toHaveAttribute('data-select', 'false');
    userEvent.click(screen.getByTestId('2,2'));
    expect(screen.getByTestId('0,0')).toHaveAttribute('data-select', 'false');
    expect(screen.getByTestId('2,2')).toHaveAttribute('data-select', 'true');
  });
  test('キーボードから数字を入力して選択中セルに記入できる', () => {
    render(<GameContainer puzzle={puzzle} blockSize={blockSize} />);
    expect(screen.getByTestId('2,2')).not.toHaveTextContent('1');
    userEvent.click(screen.getByTestId('2,2'));
    userEvent.keyboard('1');
    expect(screen.getByTestId('2,2')).toHaveTextContent('1');
  });
  test('キーボードの ArrowDown で選択セルを下に移動できる。端まで行くとループする。', () => {
    render(<GameContainer puzzle={puzzle} blockSize={blockSize} />);
    expect(screen.getByTestId('0,0')).toHaveAttribute('data-select', 'true');
    userEvent.keyboard('{ArrowDown}');
    expect(screen.getByTestId('0,0')).toHaveAttribute('data-select', 'false');
    expect(screen.getByTestId('0,1')).toHaveAttribute('data-select', 'true');
    userEvent.keyboard('{ArrowDown}');
    expect(screen.getByTestId('0,1')).toHaveAttribute('data-select', 'false');
    expect(screen.getByTestId('0,2')).toHaveAttribute('data-select', 'true');
    userEvent.keyboard('{ArrowDown}');
    expect(screen.getByTestId('0,2')).toHaveAttribute('data-select', 'false');
    expect(screen.getByTestId('0,3')).toHaveAttribute('data-select', 'true');
    userEvent.keyboard('{ArrowDown}');
    expect(screen.getByTestId('0,3')).toHaveAttribute('data-select', 'false');
    expect(screen.getByTestId('0,0')).toHaveAttribute('data-select', 'true');
  });
  test('キーボードの ArrowUp で選択セルを上に移動できる。端まで行くとループする。', () => {
    render(<GameContainer puzzle={puzzle} blockSize={blockSize} />);
    expect(screen.getByTestId('0,0')).toHaveAttribute('data-select', 'true');
    userEvent.keyboard('{ArrowUp}');
    expect(screen.getByTestId('0,0')).toHaveAttribute('data-select', 'false');
    expect(screen.getByTestId('0,3')).toHaveAttribute('data-select', 'true');
    userEvent.keyboard('{ArrowUp}');
    expect(screen.getByTestId('0,3')).toHaveAttribute('data-select', 'false');
    expect(screen.getByTestId('0,2')).toHaveAttribute('data-select', 'true');
    userEvent.keyboard('{ArrowUp}');
    expect(screen.getByTestId('0,2')).toHaveAttribute('data-select', 'false');
    expect(screen.getByTestId('0,1')).toHaveAttribute('data-select', 'true');
    userEvent.keyboard('{ArrowUp}');
    expect(screen.getByTestId('0,1')).toHaveAttribute('data-select', 'false');
    expect(screen.getByTestId('0,0')).toHaveAttribute('data-select', 'true');
  });
  test('キーボードの ArrowRight で選択セルを右に移動できる。端まで行くとループする。', () => {
    render(<GameContainer puzzle={puzzle} blockSize={blockSize} />);
    expect(screen.getByTestId('0,0')).toHaveAttribute('data-select', 'true');
    userEvent.keyboard('{ArrowRight}');
    expect(screen.getByTestId('0,0')).toHaveAttribute('data-select', 'false');
    expect(screen.getByTestId('1,0')).toHaveAttribute('data-select', 'true');
    userEvent.keyboard('{ArrowRight}');
    expect(screen.getByTestId('1,0')).toHaveAttribute('data-select', 'false');
    expect(screen.getByTestId('2,0')).toHaveAttribute('data-select', 'true');
    userEvent.keyboard('{ArrowRight}');
    expect(screen.getByTestId('2,0')).toHaveAttribute('data-select', 'false');
    expect(screen.getByTestId('3,0')).toHaveAttribute('data-select', 'true');
    userEvent.keyboard('{ArrowRight}');
    expect(screen.getByTestId('3,0')).toHaveAttribute('data-select', 'false');
    expect(screen.getByTestId('0,0')).toHaveAttribute('data-select', 'true');
  });
});

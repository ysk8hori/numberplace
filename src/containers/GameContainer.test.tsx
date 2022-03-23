import '@testing-library/jest-dom';
import React from 'react';
import { describe, test, fn, expect } from 'vitest';
import { isSamePos } from '../utils/positionUtils';
import {
  render,
  screen,
  userEvent,
  puzzle_2_2,
  blockSize_2_2,
  puzzle_2_3,
  blockSize_2_3,
  resolve_2_3,
} from '../utils/test-utils';
import GameContainer from './GameContainer';

describe('GameContainer', () => {
  test('ゲーム初期表示時の選択中セルは 0,0', () => {
    render(<GameContainer puzzle={puzzle_2_2} blockSize={blockSize_2_2} />);
    expect(screen.getByTestId('0,0')).toHaveAttribute('data-select', 'true');
    expect(screen.getByTestId('0,1')).toHaveAttribute('data-select', 'false');
  });
  test('クリックしたセルを選択中にする', () => {
    render(<GameContainer puzzle={puzzle_2_2} blockSize={blockSize_2_2} />);
    expect(screen.getByTestId('0,0')).toHaveAttribute('data-select', 'true');
    expect(screen.getByTestId('2,2')).toHaveAttribute('data-select', 'false');
    userEvent.click(screen.getByTestId('2,2'));
    expect(screen.getByTestId('0,0')).toHaveAttribute('data-select', 'false');
    expect(screen.getByTestId('2,2')).toHaveAttribute('data-select', 'true');
  });
  test('キーボードから数字を入力して選択中セルに記入できる', () => {
    render(<GameContainer puzzle={puzzle_2_2} blockSize={blockSize_2_2} />);
    expect(screen.getByTestId('2,2')).not.toHaveTextContent('1');
    userEvent.click(screen.getByTestId('2,2'));
    userEvent.keyboard('1');
    expect(screen.getByTestId('2,2')).toHaveTextContent('1');
  });
  test('親から受け取った puzzle の変更を行わない', () => {
    render(<GameContainer puzzle={puzzle_2_2} blockSize={blockSize_2_2} />);
    expect(screen.getByTestId('2,2')).not.toHaveTextContent('1');
    userEvent.click(screen.getByTestId('2,2'));
    userEvent.keyboard('1');
    expect(screen.getByTestId('2,2')).toHaveTextContent('1');
    expect(
      puzzle_2_2.cells.find(cell => isSamePos(cell.pos, [2, 2]))!.answer,
    ).not.toEqual('1');
  });
  test('キーボードの ArrowDown で選択セルを下に移動できる。端まで行くとループする。', () => {
    render(<GameContainer puzzle={puzzle_2_2} blockSize={blockSize_2_2} />);
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
    render(<GameContainer puzzle={puzzle_2_2} blockSize={blockSize_2_2} />);
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
    render(<GameContainer puzzle={puzzle_2_2} blockSize={blockSize_2_2} />);
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
  test('キーボードの ArrowLeft で選択セルを左に移動できる。端まで行くとループする。', () => {
    render(<GameContainer puzzle={puzzle_2_2} blockSize={blockSize_2_2} />);
    expect(screen.getByTestId('0,0')).toHaveAttribute('data-select', 'true');
    userEvent.keyboard('{ArrowLeft}');
    expect(screen.getByTestId('0,0')).toHaveAttribute('data-select', 'false');
    expect(screen.getByTestId('3,0')).toHaveAttribute('data-select', 'true');
    userEvent.keyboard('{ArrowLeft}');
    expect(screen.getByTestId('3,0')).toHaveAttribute('data-select', 'false');
    expect(screen.getByTestId('2,0')).toHaveAttribute('data-select', 'true');
    userEvent.keyboard('{ArrowLeft}');
    expect(screen.getByTestId('2,0')).toHaveAttribute('data-select', 'false');
    expect(screen.getByTestId('1,0')).toHaveAttribute('data-select', 'true');
    userEvent.keyboard('{ArrowLeft}');
    expect(screen.getByTestId('1,0')).toHaveAttribute('data-select', 'false');
    expect(screen.getByTestId('0,0')).toHaveAttribute('data-select', 'true');
  });
  test('入力パネルを表示する', () => {
    render(<GameContainer puzzle={puzzle_2_2} blockSize={blockSize_2_2} />);
    expect(screen.getByRole('button', { name: '1' })).toBeEnabled();
    expect(screen.getByRole('button', { name: '2' })).toBeEnabled();
    expect(screen.getByRole('button', { name: '3' })).toBeEnabled();
    expect(screen.getByRole('button', { name: '4' })).toBeEnabled();
    expect(screen.queryByRole('button', { name: '5' })).toBeDisabled();
  });
  test('入力パネルから数字を入力して選択中セルに記入できる', () => {
    render(<GameContainer puzzle={puzzle_2_2} blockSize={blockSize_2_2} />);
    expect(screen.getByTestId('2,2')).not.toHaveTextContent('1');
    userEvent.click(screen.getByTestId('2,2'));
    userEvent.click(screen.getByRole('button', { name: '1' }));
    expect(screen.getByTestId('2,2')).toHaveTextContent('1');
  });
  test('最初から記入済みのセルは上書きできない', () => {
    render(<GameContainer puzzle={puzzle_2_2} blockSize={blockSize_2_2} />);
    expect(screen.getByTestId('0,1')).toHaveTextContent('2');
    userEvent.click(screen.getByTestId('0,1'));
    userEvent.click(screen.getByRole('button', { name: '1' }));
    expect(screen.getByTestId('0,1')).toHaveTextContent('2');
  });
  test('最初空欄だったセルは上書きできる', () => {
    render(<GameContainer puzzle={puzzle_2_2} blockSize={blockSize_2_2} />);
    expect(screen.getByTestId('0,0')).not.toHaveTextContent('2');
    userEvent.click(screen.getByTestId('0,0'));
    userEvent.click(screen.getByRole('button', { name: '2' }));
    expect(screen.getByTestId('0,0')).toHaveTextContent('2');
    userEvent.click(screen.getByRole('button', { name: '1' }));
    expect(screen.getByTestId('0,0')).toHaveTextContent('1');
  });
  test('全てのセルに答えを記入したら、答え合わせするかどうかの確認モーダルを出す。', () => {
    render(<GameContainer puzzle={puzzle_2_3} blockSize={blockSize_2_3} />);
    resolve_2_3({ finish: false });
    expect(
      screen.queryByRole('dialog', { name: /答え合わせしますか/ }),
    ).not.toBeInTheDocument();
  });
});

import '@testing-library/jest-dom';
import React from 'react';
import { describe, test, fn, expect } from 'vitest';
import {
  render,
  screen,
  userEvent,
  puzzle_2_2 as puzzle,
  blockSize_2_2 as blockSize,
} from '../../utils/test-utils';
import GameBoard from './GameBoard';

describe('GameBoard', () => {
  test('GameBoard は 全ての cell を答えとともに表示する', () => {
    render(<GameBoard puzzle={puzzle} blockSize={blockSize} />);
    // 1行目
    expect(screen.getByTestId('0,0')).toHaveTextContent('');
    expect(screen.getByTestId('1,0')).toHaveTextContent('4');
    expect(screen.getByTestId('2,0')).toHaveTextContent('');
    expect(screen.getByTestId('3,0')).toHaveTextContent('2');
    // 2行目
    expect(screen.getByTestId('0,1')).toHaveTextContent('2');
    expect(screen.getByTestId('1,1')).toHaveTextContent('');
    expect(screen.getByTestId('2,1')).toHaveTextContent('4');
    expect(screen.getByTestId('3,1')).toHaveTextContent('');
    // 3行目
    expect(screen.getByTestId('0,2')).toHaveTextContent('3');
    expect(screen.getByTestId('1,2')).toHaveTextContent('');
    expect(screen.getByTestId('2,2')).toHaveTextContent('');
    expect(screen.getByTestId('3,2')).toHaveTextContent('4');
    // 4行目
    expect(screen.getByTestId('0,3')).toHaveTextContent('');
    expect(screen.getByTestId('1,3')).toHaveTextContent('');
    expect(screen.getByTestId('2,3')).toHaveTextContent('2');
    expect(screen.getByTestId('3,3')).toHaveTextContent('');
  });
  test('選択したセルをコールバックで親へ伝えられる', () => {
    const onSelectCell = fn();
    render(
      <GameBoard
        puzzle={puzzle}
        blockSize={blockSize}
        onSelectCell={onSelectCell}
      />,
    );
    userEvent.click(screen.getByTestId('0,1'));
    expect(onSelectCell).toHaveBeenCalledWith([0, 1]);
    userEvent.click(screen.getByTestId('3,3'));
    expect(onSelectCell).toHaveBeenCalledWith([3, 3]);
  });
  test('選択したセルをコールバックで親へ伝えられる', () => {
    const onSelectCell = fn();
    render(
      <GameBoard
        puzzle={puzzle}
        blockSize={blockSize}
        onSelectCell={onSelectCell}
      />,
    );
    userEvent.click(screen.getByTestId('0,1'));
    expect(onSelectCell).toHaveBeenCalledWith([0, 1]);
    userEvent.click(screen.getByTestId('3,3'));
    expect(onSelectCell).toHaveBeenCalledWith([3, 3]);
  });
  test('選択中のセルを指定できる', () => {
    render(
      <GameBoard puzzle={puzzle} blockSize={blockSize} selectedPos={[0, 1]} />,
    );
    expect(screen.getByTestId('0,1')).toHaveAttribute('data-select', 'true');
    expect(screen.getByTestId('0,2')).toHaveAttribute('data-select', 'false');
  });
});

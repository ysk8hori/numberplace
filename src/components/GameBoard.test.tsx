import '@testing-library/jest-dom';
import React from 'react';
import { describe, test, it, expect } from 'vitest';
import { render, screen, userEvent } from '../utils/test-utils';
import GameBoard from './GameBoard';
import { generateGame } from '@ysk8hori/numberplace-generator';

const blockSize: Parameters<typeof generateGame>[0] = { height: 2, width: 2 };

const puzzle: ReturnType<typeof generateGame>[0] = {
  ...JSON.parse(
    '{"cells":[{"pos":[0,0]},{"pos":[1,0],"answer":"4"},{"pos":[2,0]},{"pos":[3,0],"answer":"2"},{"pos":[0,1],"answer":"2"},{"pos":[1,1]},{"pos":[2,1],"answer":"4"},{"pos":[3,1]},{"pos":[0,2],"answer":"3"},{"pos":[1,2]},{"pos":[2,2]},{"pos":[3,2],"answer":"4"},{"pos":[0,3]},{"pos":[1,3]},{"pos":[2,3],"answer":"2"},{"pos":[3,3]}]}',
  ),
  toString: () => ` ,4, ,2
2, ,4, 
3, , ,4
 , ,2, `,
};

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
});

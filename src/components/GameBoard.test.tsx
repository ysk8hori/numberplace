import '@testing-library/jest-dom';
import React from 'react';
import { describe, test, it, expect } from 'vitest';
import { render, screen, userEvent } from '../utils/test-utils';
import GameBoard from './GameBoard';
import { BlockSize, Game } from '@ysk8hori/numberplace-generator';

const blockSize: BlockSize = { height: 2, width: 2 };

const puzzle: Game = {
  ...JSON.parse(
    '{"cells":[{"pos":[0,0]},{"pos":[1,0],"answer":"4"},{"pos":[2,0]},{"pos":[3,0],"answer":"2"},{"pos":[0,1],"answer":"2"},{"pos":[1,1]},{"pos":[2,1],"answer":"4"},{"pos":[3,1]},{"pos":[0,2],"answer":"3"},{"pos":[1,2]},{"pos":[2,2]},{"pos":[3,2],"answer":"4"},{"pos":[0,3]},{"pos":[1,3]},{"pos":[2,3],"answer":"2"},{"pos":[3,3]}]}',
  ),
  toString: () => ` ,4, ,2
2, ,4, 
3, , ,4
 , ,2, `,
};

const blockSize_2_3: BlockSize = {
  height: 2,
  width: 3,
};
const puzzle_2_3: Game = {
  ...JSON.parse(
    '{"cells":[{"pos":[0,0]},{"pos":[1,0],"answer":"2"},{"pos":[2,0]},{"pos":[3,0],"answer":"4"},{"pos":[4,0],"answer":"3"},{"pos":[5,0],"answer":"5"},{"pos":[0,1],"answer":"4"},{"pos":[1,1]},{"pos":[2,1]},{"pos":[3,1]},{"pos":[4,1]},{"pos":[5,1],"answer":"1"},{"pos":[0,2],"answer":"3"},{"pos":[1,2]},{"pos":[2,2]},{"pos":[3,2],"answer":"2"},{"pos":[4,2]},{"pos":[5,2]},{"pos":[0,3]},{"pos":[1,3],"answer":"1"},{"pos":[2,3],"answer":"6"},{"pos":[3,3]},{"pos":[4,3]},{"pos":[5,3]},{"pos":[0,4]},{"pos":[1,4]},{"pos":[2,4],"answer":"2"},{"pos":[3,4]},{"pos":[4,4]},{"pos":[5,4],"answer":"4"},{"pos":[0,5]},{"pos":[1,5],"answer":"6"},{"pos":[2,5],"answer":"4"},{"pos":[3,5]},{"pos":[4,5],"answer":"5"},{"pos":[5,5]}]}',
  ),
  toString: () => ` ,2, ,4,3,5
  4, , , , ,1
  3, , ,2, , 
   ,1,6, , , 
   , ,2, , ,4
   ,6,4, ,5, ,`,
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

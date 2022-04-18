import '@testing-library/jest-dom';
import React from 'react';
import ReactModal from 'react-modal';
import { test, expect } from 'vitest';
import { isSamePos } from '../utils/positionUtils';
import {
  render,
  screen,
  userEvent,
  puzzle_2_2,
  corrected_2_2,
  blockSize_2_2,
  puzzle_2_3,
  blockSize_2_3,
  corrected_2_3,
  resolve_2_3,
} from '../utils/test-utils';
import GameContainer from './GameContainer';
import gameHolder from '../utils/gameHolder';
import { MyGame } from '../utils/typeUtils';

function setup(size: '2_2' | '2_3') {
  const rendered = render(
    size === '2_2' ? (
      <GameContainer
        puzzle={puzzle_2_2}
        corrected={corrected_2_2}
        blockSize={blockSize_2_2}
      />
    ) : (
      <GameContainer
        puzzle={puzzle_2_3}
        corrected={corrected_2_3}
        blockSize={blockSize_2_3}
      />
    ),
  );
  ReactModal.setAppElement(rendered.container);
}

test('ゲーム開始時に isFix を付与したパズルを保存する', () => {
  setup('2_2');
  const puzzle = JSON.parse(JSON.stringify(puzzle_2_2)) as MyGame;
  puzzle.cells.filter(cell => cell.answer).forEach(cell => (cell.isFix = true));
  expect(gameHolder.loadGame()).toEqual({
    puzzle,
    corrected: corrected_2_2,
    blockSize: blockSize_2_2,
    cross: false,
  });
});

test('数字入力時に保存する', () => {
  setup('2_2');
  expect(
    gameHolder
      .loadGame()
      ?.puzzle.cells.find(cell => isSamePos(cell.pos, [2, 2]))?.answer,
  ).toBeUndefined();
  userEvent.click(screen.getByTestId('2,2'));
  userEvent.keyboard('1');
  expect(
    gameHolder
      .loadGame()
      ?.puzzle.cells.find(cell => isSamePos(cell.pos, [2, 2]))?.answer,
  ).toEqual('1');
});

test('数字削除時に保存する', () => {
  setup('2_2');
  userEvent.click(screen.getByTestId('2,2'));
  userEvent.keyboard('1');
  userEvent.keyboard('{Backspace}');
  expect(
    gameHolder
      .loadGame()
      ?.puzzle.cells.find(cell => isSamePos(cell.pos, [2, 2]))?.answer,
  ).toBeUndefined();
});

test('こたえあわせ後に保存する（fix が記録される）', () => {
  const puzzle = JSON.parse(JSON.stringify(puzzle_2_2)) as MyGame;
  const targetCell = puzzle.cells.find(cell => isSamePos(cell.pos, [2, 2]))!;
  targetCell.answer = '1';
  targetCell.isFix = true;
  setup('2_2');
  userEvent.click(screen.getByTestId('2,2'));
  userEvent.keyboard('1');
  userEvent.click(screen.getByRole('button', { name: 'こたえあわせ' }));
  userEvent.click(screen.getByRole('button', { name: 'はい' }));
  expect(gameHolder.loadGame()).toEqual({
    puzzle,
    corrected: corrected_2_2,
    blockSize: blockSize_2_2,
    cross: false,
  });
});

test('ゲームクリア後に「ほかの おおきさで あそぶ」をクリックすると保存していたゲームを削除する', () => {
  setup('2_3');
  resolve_2_3({ finish: true });
  userEvent.click(screen.getByRole('button', { name: 'こたえあわせ' }));
  userEvent.click(screen.getByRole('button', { name: 'はい' }));
  expect(gameHolder.loadGame()).toBeDefined();
  userEvent.click(
    screen.getByRole('button', { name: 'ほかの おおきさで あそぶ' }),
  );
  expect(gameHolder.loadGame()).toBeUndefined();
});

test('ゲームクリア後に「おなじ おおきさで あそぶ」をクリックすると保存していたゲームを削除する', () => {
  setup('2_3');
  resolve_2_3({ finish: true });
  userEvent.click(screen.getByRole('button', { name: 'こたえあわせ' }));
  userEvent.click(screen.getByRole('button', { name: 'はい' }));
  expect(gameHolder.loadGame()).toBeDefined();
  userEvent.click(
    screen.getByRole('button', { name: 'おなじ おおきさで あそぶ' }),
  );
  expect(gameHolder.loadGame()).toBeUndefined();
});

test('ゲームをやめると保存していたゲームを削除する', () => {
  setup('2_2');
  userEvent.click(screen.getByRole('button', { name: 'ゲームをやめる' }));
  expect(gameHolder.loadGame()).toBeDefined();
  userEvent.click(screen.getByRole('button', { name: 'はい' }));
  expect(gameHolder.loadGame()).toBeUndefined();
});

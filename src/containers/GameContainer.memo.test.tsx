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
} from '../utils/test-utils';
import GameContainer from './GameContainer';

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

test('メモモードで空欄セルにメモ記入', () => {
  setup('2_2');
  expect(screen.getByTestId('0,0')).not.toHaveTextContent('1');
  expect(screen.getByTestId('0,0-memo')).not.toHaveTextContent('1');
  userEvent.click(screen.getByTestId('0,0'));
  userEvent.click(screen.getByRole('checkbox', { name: 'メモ' }));
  userEvent.click(screen.getByRole('button', { name: '1' }));
  expect(screen.getByTestId('0,0-memo')).toHaveTextContent('1');
});
test('メモモードでメモ済み数字と同じボタン押下でそのメモ数字を消す', () => {
  setup('2_2');
  expect(screen.getByTestId('0,0')).not.toHaveTextContent('1');
  expect(screen.getByTestId('0,0-memo')).not.toHaveTextContent('1');
  userEvent.click(screen.getByTestId('0,0'));
  userEvent.click(screen.getByRole('checkbox', { name: 'メモ' }));
  userEvent.click(screen.getByRole('button', { name: '1' }));
  userEvent.click(screen.getByRole('button', { name: '2' }));
  expect(screen.getByTestId('0,0-memo')).toHaveTextContent('1');
  expect(screen.getByTestId('0,0-memo')).toHaveTextContent('2');
  userEvent.click(screen.getByRole('button', { name: '1' }));
  expect(screen.getByTestId('0,0-memo')).not.toHaveTextContent('1');
  expect(screen.getByTestId('0,0-memo')).toHaveTextContent('2');
});
test('メモモードで入力済みセル上書き', () => {
  setup('2_2');
  expect(screen.getByTestId('0,0')).toHaveTextContent('');
  userEvent.click(screen.getByTestId('0,0'));
  userEvent.click(screen.getByRole('button', { name: '2' }));
  expect(screen.getByTestId('0,0')).toHaveTextContent('2');
  userEvent.click(screen.getByRole('checkbox', { name: 'メモ' }));
  userEvent.click(screen.getByRole('button', { name: '1' }));
  expect(screen.getByTestId('0,0')).toHaveTextContent('1');
  expect(screen.getByTestId('0,0-memo')).toHaveTextContent('1');
});
test.todo('メモ記入済みセルに通常入力で上書き');
test.todo('メモモードで消去ボタン');

test('fix のセルはメモ入力ボタンでメモを記入できない', () => {
  setup('2_2');
  expect(screen.getByTestId('1,0')).toHaveTextContent('4');
  expect(screen.getByTestId('1,0')).toHaveAttribute('data-fix');
  userEvent.click(screen.getByTestId('1,0'));
  userEvent.click(screen.getByRole('checkbox', { name: 'メモ' }));
  userEvent.click(screen.getByRole('button', { name: '1' }));
  expect(screen.getByTestId('1,0')).toHaveTextContent('4');
  expect(screen.getByTestId('1,0')).toHaveAttribute('data-fix');
});

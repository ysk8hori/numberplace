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

test('ゲーム初期表示時の選択中セルは 0,0', () => {
  setup('2_2');
  expect(screen.getByTestId('0,0')).toHaveAttribute('data-select', 'true');
  expect(screen.getByTestId('0,1')).toHaveAttribute('data-select', 'false');
});
test('クリックしたセルを選択中にする', () => {
  setup('2_2');
  expect(screen.getByTestId('0,0')).toHaveAttribute('data-select', 'true');
  expect(screen.getByTestId('2,2')).toHaveAttribute('data-select', 'false');
  userEvent.click(screen.getByTestId('2,2'));
  expect(screen.getByTestId('0,0')).toHaveAttribute('data-select', 'false');
  expect(screen.getByTestId('2,2')).toHaveAttribute('data-select', 'true');
});
test('キーボードから数字を入力して選択中セルに記入できる', () => {
  setup('2_2');
  expect(screen.getByTestId('2,2')).not.toHaveTextContent('1');
  userEvent.click(screen.getByTestId('2,2'));
  userEvent.keyboard('1');
  expect(screen.getByTestId('2,2')).toHaveTextContent('1');
});
test('キーボードから数字を入力しても問題が扱えない数字の場合は選択中セルに記入しない', () => {
  setup('2_2');
  expect(screen.getByTestId('2,2')).not.toHaveTextContent('0');
  userEvent.click(screen.getByTestId('2,2'));
  userEvent.keyboard('0');
  expect(screen.getByTestId('2,2')).not.toHaveTextContent('0');
  userEvent.keyboard('5');
  expect(screen.getByTestId('2,2')).not.toHaveTextContent('5');
});
test('fix のセルはキーボード入力で上書きできない', () => {
  setup('2_2');
  expect(screen.getByTestId('1,0')).toHaveTextContent('4');
  expect(screen.getByTestId('1,0')).toHaveAttribute('data-fix');
  userEvent.click(screen.getByTestId('1,0'));
  userEvent.keyboard('1');
  expect(screen.getByTestId('1,0')).toHaveTextContent('4');
  expect(screen.getByTestId('1,0')).toHaveAttribute('data-fix');
});
test('fix していない入力済みのセルはキーボードの Backspace で空欄にできる', () => {
  setup('2_2');
  expect(screen.getByTestId('0,0')).not.toHaveAttribute('data-fix');
  userEvent.click(screen.getByTestId('0,0'));
  userEvent.keyboard('1');
  expect(screen.getByTestId('0,0')).toHaveTextContent('1');
  userEvent.keyboard('{Backspace}');
  expect(screen.getByTestId('0,0')).toHaveTextContent('');
});
test('fix のセルはキーボードの Backspace で空欄にできない', () => {
  setup('2_2');
  expect(screen.getByTestId('1,0')).toHaveAttribute('data-fix');
  expect(screen.getByTestId('1,0')).toHaveTextContent('4');
  userEvent.click(screen.getByTestId('1,0'));
  userEvent.keyboard('{Backspace}');
  expect(screen.getByTestId('1,0')).toHaveAttribute('data-fix');
  expect(screen.getByTestId('1,0')).toHaveTextContent('4');
});
test('親から受け取った puzzle の変更を行わない', () => {
  setup('2_2');
  expect(screen.getByTestId('2,2')).not.toHaveTextContent('1');
  userEvent.click(screen.getByTestId('2,2'));
  userEvent.keyboard('1');
  expect(screen.getByTestId('2,2')).toHaveTextContent('1');
  expect(
    puzzle_2_2.cells.find(cell => isSamePos(cell.pos, [2, 2]))!.answer,
  ).not.toEqual('1');
});
test('キーボードの ArrowDown で選択セルを下に移動できる。端まで行くとループする。', () => {
  setup('2_2');
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
  setup('2_2');
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
  setup('2_2');
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
  setup('2_2');
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
  setup('2_2');
  expect(screen.getByRole('button', { name: '1' })).toBeEnabled();
  expect(screen.getByRole('button', { name: '2' })).toBeEnabled();
  expect(screen.getByRole('button', { name: '3' })).toBeEnabled();
  expect(screen.getByRole('button', { name: '4' })).toBeEnabled();
  expect(screen.queryByRole('button', { name: '5' })).toBeDisabled();
});
test('入力パネルから数字を入力して選択中セルに記入できる', () => {
  setup('2_2');
  expect(screen.getByTestId('2,2')).not.toHaveTextContent('1');
  userEvent.click(screen.getByTestId('2,2'));
  userEvent.click(screen.getByRole('button', { name: '1' }));
  expect(screen.getByTestId('2,2')).toHaveTextContent('1');
});
test('規定回数入力済みの数字は input パネルのボタンが非活性になる', () => {
  setup('2_2'); // 2がはじめから3箇所に記入されている状態
  userEvent.click(screen.getByTestId('0,0'));
  userEvent.click(screen.getByRole('button', { name: '2' }));
  expect(screen.getByRole('button', { name: '2' })).toBeDisabled();
});
test('規定回数入力済みの数字を削除した場合 input パネルのボタンが活性状態になる', () => {
  setup('2_2'); // 2がはじめから3箇所に記入されている状態
  userEvent.click(screen.getByTestId('0,0'));
  userEvent.click(screen.getByRole('button', { name: '2' }));
  expect(screen.getByRole('button', { name: '2' })).toBeDisabled();
  userEvent.click(screen.getByRole('button', { name: '消す' }));
  expect(screen.getByRole('button', { name: '2' })).toBeEnabled();
});
test('最初から記入済みのセルは上書きできない', () => {
  setup('2_2');
  expect(screen.getByTestId('0,1')).toHaveTextContent('2');
  userEvent.click(screen.getByTestId('0,1'));
  userEvent.click(screen.getByRole('button', { name: '1' }));
  expect(screen.getByTestId('0,1')).toHaveTextContent('2');
});
test('最初空欄だったセルは上書きできる', () => {
  setup('2_2');
  expect(screen.getByTestId('0,0')).not.toHaveTextContent('2');
  userEvent.click(screen.getByTestId('0,0'));
  userEvent.click(screen.getByRole('button', { name: '2' }));
  expect(screen.getByTestId('0,0')).toHaveTextContent('2');
  userEvent.click(screen.getByRole('button', { name: '1' }));
  expect(screen.getByTestId('0,0')).toHaveTextContent('1');
});
test('fix のセルは入力パネルで上書きできない', () => {
  setup('2_2');
  expect(screen.getByTestId('1,0')).toHaveTextContent('4');
  expect(screen.getByTestId('1,0')).toHaveAttribute('data-fix');
  userEvent.click(screen.getByTestId('1,0'));
  userEvent.click(screen.getByRole('button', { name: '1' }));
  expect(screen.getByTestId('1,0')).toHaveTextContent('4');
  expect(screen.getByTestId('1,0')).toHaveAttribute('data-fix');
});
test('fix でない入力済みのセルは消去ボタンで空欄にできる', () => {
  setup('2_2');
  expect(screen.getByTestId('0,0')).toHaveTextContent('');
  userEvent.click(screen.getByTestId('0,0'));
  userEvent.click(screen.getByRole('button', { name: '2' }));
  expect(screen.getByTestId('0,0')).toHaveTextContent('2');
  userEvent.click(screen.getByRole('button', { name: '消す' }));
  expect(screen.getByTestId('0,0')).toHaveTextContent('');
});
test('fix のセルは消去ボタンで空欄にできない', () => {
  setup('2_2');
  expect(screen.getByTestId('1,0')).toHaveTextContent('4');
  expect(screen.getByTestId('1,0')).toHaveAttribute('data-fix');
  userEvent.click(screen.getByTestId('1,0'));
  userEvent.click(screen.getByRole('button', { name: '消す' }));
  expect(screen.getByTestId('1,0')).toHaveTextContent('4');
  expect(screen.getByTestId('1,0')).toHaveAttribute('data-fix');
});

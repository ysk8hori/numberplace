import '@testing-library/jest-dom';
import React from 'react';
import ReactModal from 'react-modal';
import { test, expect } from 'vitest';
import {
  render,
  screen,
  userEvent,
  puzzle_2_2,
  solved_2_2,
  blockSize_2_2,
  puzzle_2_3,
  blockSize_2_3,
  solved_2_3,
} from '../../utils/test-utils';
import GameContainer from '.';

function setup(size: '2_2' | '2_3') {
  const rendered = render(
    size === '2_2' ? (
      <GameContainer
        puzzle={puzzle_2_2}
        solved={solved_2_2}
        blockSize={blockSize_2_2}
      />
    ) : (
      <GameContainer
        puzzle={puzzle_2_3}
        solved={solved_2_3}
        blockSize={blockSize_2_3}
      />
    ),
  );
  ReactModal.setAppElement(rendered.container);
}

test('メモモードで入力パネルから空欄セルにメモを記入できる', async () => {
  setup('2_2');
  expect(screen.getByTestId('0,0')).not.toHaveTextContent('1');
  expect(screen.queryByTestId('0,0-memo')).not.toBeInTheDocument();
  await userEvent.click(screen.getByTestId('0,0'));
  await userEvent.click(screen.getByRole('checkbox', { name: 'メモ' }));
  await userEvent.click(screen.getByRole('button', { name: '1' }));
  expect(screen.getByTestId('0,0-memo')).toHaveAttribute('data-memo', '1');
});
test('メモモードでキーボードから空欄セルにメモを記入できる', async () => {
  setup('2_2');
  expect(screen.getByTestId('0,0')).not.toHaveTextContent('1');
  expect(screen.queryByTestId('0,0-memo')).not.toBeInTheDocument();
  await userEvent.click(screen.getByTestId('0,0'));
  await userEvent.click(screen.getByRole('checkbox', { name: 'メモ' }));
  await userEvent.keyboard('1');
  expect(screen.getByTestId('0,0-memo')).toHaveAttribute('data-memo', '1');
});
test('メモモードでメモ済み数字と同じボタン押下でそのメモ数字を消す', async () => {
  setup('2_2');
  expect(screen.getByTestId('0,0')).not.toHaveTextContent('1');
  expect(screen.queryByTestId('0,0-memo')).not.toBeInTheDocument();
  await userEvent.click(screen.getByTestId('0,0'));
  await userEvent.click(screen.getByRole('checkbox', { name: 'メモ' }));
  await userEvent.click(screen.getByRole('button', { name: '1' }));
  await userEvent.click(screen.getByRole('button', { name: '2' }));
  expect(screen.getByTestId('0,0-memo')).toHaveAttribute('data-memo', '1,2');
  await userEvent.click(screen.getByRole('button', { name: '1' }));
  expect(screen.getByTestId('0,0-memo')).not.toHaveTextContent('1');
  expect(screen.getByTestId('0,0-memo')).toHaveAttribute('data-memo', '2');
});
test('メモモードで入力済みセル上書き', async () => {
  setup('2_2');
  expect(screen.getByTestId('0,0')).not.toHaveAttribute('data-answer');
  await userEvent.click(screen.getByTestId('0,0'));
  await userEvent.click(screen.getByRole('button', { name: '2' }));
  expect(screen.getByTestId('0,0')).toHaveAttribute('data-answer', '2');
  await userEvent.click(screen.getByRole('checkbox', { name: 'メモ' }));
  await userEvent.click(screen.getByRole('button', { name: '1' }));
  expect(screen.getByTestId('0,0')).not.toHaveAttribute('data-answer');
  expect(screen.getByTestId('0,0-memo')).toHaveAttribute('data-memo', '1');
});
test('メモ記入済みセルに通常入力で上書き', async () => {
  setup('2_2');
  expect(screen.getByTestId('0,0')).not.toHaveAttribute('data-answer');
  await userEvent.click(screen.getByTestId('0,0'));
  await userEvent.click(screen.getByRole('checkbox', { name: 'メモ' }));
  await userEvent.click(screen.getByRole('button', { name: '1' }));
  expect(screen.getByTestId('0,0-memo')).toHaveAttribute('data-memo', '1');
  await userEvent.click(screen.getByRole('checkbox', { name: 'メモ' }));
  await userEvent.click(screen.getByRole('button', { name: '2' }));
  expect(screen.getByTestId('0,0')).toHaveAttribute('data-answer', '2');
});
test('メモがある、かつメモモードで消去ボタンを押下するとメモをクリアする', async () => {
  setup('2_2');
  expect(screen.getByTestId('0,0')).not.toHaveAttribute('data-answer');
  await userEvent.click(screen.getByTestId('0,0'));
  await userEvent.click(screen.getByRole('checkbox', { name: 'メモ' }));
  await userEvent.click(screen.getByRole('button', { name: '1' }));
  await userEvent.click(screen.getByRole('button', { name: '2' }));
  expect(screen.getByTestId('0,0-memo')).toHaveAttribute('data-memo', '1,2');
  await userEvent.click(screen.getByRole('button', { name: '消す' }));
  expect(screen.queryByTestId('0,0-memo')).not.toBeInTheDocument();
});
test('メモがある、かつ通常モードで消去ボタンを押下するとメモをクリアする', async () => {
  setup('2_2');
  expect(screen.getByTestId('0,0')).not.toHaveAttribute('data-answer');
  await userEvent.click(screen.getByTestId('0,0'));
  await userEvent.click(screen.getByRole('checkbox', { name: 'メモ' }));
  await userEvent.click(screen.getByRole('button', { name: '1' }));
  await userEvent.click(screen.getByRole('button', { name: '2' }));
  await userEvent.click(screen.getByRole('checkbox', { name: 'メモ' }));
  expect(screen.getByTestId('0,0-memo')).toHaveAttribute('data-memo', '1,2');
  await userEvent.click(screen.getByRole('button', { name: '消す' }));
  expect(screen.queryByTestId('0,0-memo')).not.toBeInTheDocument();
});

test('fix のセルはメモ入力ボタンでメモを記入できない', async () => {
  setup('2_2');
  expect(screen.getByTestId('1,0')).toHaveAttribute('data-answer', '4');
  expect(screen.getByTestId('1,0')).toHaveAttribute('data-fix');
  await userEvent.click(screen.getByTestId('1,0'));
  await userEvent.click(screen.getByRole('checkbox', { name: 'メモ' }));
  await userEvent.click(screen.getByRole('button', { name: '1' }));
  expect(screen.getByTestId('1,0')).toHaveAttribute('data-answer', '4');
  expect(screen.getByTestId('1,0')).toHaveAttribute('data-fix');
});
test('キーボードの Shift でメモモードに変更しメモボタンで通常モードに変更できる', async () => {
  setup('2_2');
  expect(screen.getByTestId('0,0')).not.toHaveTextContent('1');
  expect(screen.queryByTestId('0,0-memo')).not.toBeInTheDocument();
  await userEvent.click(screen.getByTestId('0,0'));
  await userEvent.keyboard('{Shift}');
  await userEvent.click(screen.getByRole('button', { name: '1' }));
  expect(screen.getByTestId('0,0-memo')).toHaveAttribute('data-memo', '1');
  await userEvent.click(screen.getByRole('checkbox', { name: 'メモ' }));
  await userEvent.click(screen.getByRole('button', { name: '2' }));
  expect(screen.getByTestId('0,0')).toHaveAttribute('data-answer', '2');
});
test('メモボタンでメモモードに変更しキーボードの Shift で通常モードに変更できる', async () => {
  setup('2_2');
  expect(screen.getByTestId('0,0')).not.toHaveTextContent('1');
  expect(screen.queryByTestId('0,0-memo')).not.toBeInTheDocument();
  await userEvent.click(screen.getByTestId('0,0'));
  await userEvent.click(screen.getByRole('checkbox', { name: 'メモ' }));
  await userEvent.click(screen.getByRole('button', { name: '1' }));
  expect(screen.getByTestId('0,0-memo')).toHaveAttribute('data-memo', '1');
  await userEvent.keyboard('{Shift}');
  await userEvent.click(screen.getByRole('button', { name: '2' }));
  expect(screen.getByTestId('0,0')).toHaveAttribute('data-answer', '2');
});

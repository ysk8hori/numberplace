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
  resolve_2_3,
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

test('「こたえあわせ」ボタンを押下したら答え合わせするかどうかの確認ダイアログを出す', async () => {
  setup('2_3');
  expect(
    screen.queryByRole('dialog', { name: /答え合わせの確認/ }),
  ).not.toBeInTheDocument();
  await userEvent.click(screen.getByRole('button', { name: 'こたえあわせ' }));
  expect(
    screen.queryByRole('dialog', { name: /答え合わせの確認/ }),
  ).toBeInTheDocument();
});
test('「こたえあわせ」によって正しい Cell のみ fix する', async () => {
  setup('2_3');
  await userEvent.click(screen.getByTestId('0,0'));
  await userEvent.keyboard('6'); // 正答を記入
  await userEvent.click(screen.getByTestId('1,1'));
  await userEvent.keyboard('6'); // 誤答を記入
  expect(screen.getByTestId('0,0')).not.toHaveAttribute('data-fix'); // 正答を記入したセル
  expect(screen.getByTestId('1,0')).toHaveAttribute('data-fix'); // fix 済みセル
  expect(screen.getByTestId('2,0')).not.toHaveAttribute('data-fix'); // 未記入セル
  expect(screen.getByTestId('1,1')).not.toHaveAttribute('data-fix'); // 誤答を記入したセル
  await userEvent.click(screen.getByRole('button', { name: 'こたえあわせ' }));
  await userEvent.click(screen.getByRole('button', { name: 'はい' }));
  expect(screen.getByTestId('0,0')).toHaveAttribute('data-fix'); // 正答を記入したセルは fix する
  expect(screen.getByTestId('1,0')).toHaveAttribute('data-fix'); // fix 済みセル
  expect(screen.getByTestId('2,0')).not.toHaveAttribute('data-fix'); // 未記入セル
  expect(screen.getByTestId('1,1')).not.toHaveAttribute('data-fix'); // 誤答を記入したセル
});
test('「こたえあわせ」によって誤りのセルや空欄のセルがあった場合はダイアログで通知する', async () => {
  setup('2_3');
  await userEvent.click(screen.getByTestId('0,0'));
  await userEvent.keyboard('6'); // 正答を記入
  await userEvent.click(screen.getByTestId('1,1'));
  await userEvent.keyboard('6'); // 誤答を記入
  expect(screen.getByTestId('0,0')).not.toHaveAttribute('data-fix'); // 正答を記入したセル
  expect(screen.getByTestId('1,0')).toHaveAttribute('data-fix'); // fix 済みセル
  expect(screen.getByTestId('2,0')).not.toHaveAttribute('data-fix'); // 未記入セル
  expect(screen.getByTestId('1,1')).not.toHaveAttribute('data-fix'); // 誤答を記入したセル
  await userEvent.click(screen.getByRole('button', { name: 'こたえあわせ' }));
  await userEvent.click(screen.getByRole('button', { name: 'はい' }));
  expect(
    screen.getByRole('dialog', { name: '不正解です' }),
  ).toBeInTheDocument();
});
test('誤りのセルや空欄のセルがある状態で「こたえあわせ」を２度連続で行った場合、２度ともダイアログで通知する', async () => {
  setup('2_3');
  await userEvent.click(screen.getByTestId('0,0'));
  await userEvent.keyboard('6'); // 正答を記入
  await userEvent.click(screen.getByTestId('1,1'));
  await userEvent.keyboard('6'); // 誤答を記入
  expect(screen.getByTestId('0,0')).not.toHaveAttribute('data-fix'); // 正答を記入したセル
  expect(screen.getByTestId('1,0')).toHaveAttribute('data-fix'); // fix 済みセル
  expect(screen.getByTestId('2,0')).not.toHaveAttribute('data-fix'); // 未記入セル
  expect(screen.getByTestId('1,1')).not.toHaveAttribute('data-fix'); // 誤答を記入したセル
  await userEvent.click(screen.getByRole('button', { name: 'こたえあわせ' }));
  await userEvent.click(screen.getByRole('button', { name: 'はい' }));
  expect(
    screen.getByRole('dialog', { name: '不正解です' }),
  ).toBeInTheDocument();
  await userEvent.click(screen.getByRole('button', { name: 'OK' }));
  await userEvent.click(screen.getByRole('button', { name: 'こたえあわせ' }));
  await userEvent.click(screen.getByRole('button', { name: 'はい' }));
  expect(
    screen.getByRole('dialog', { name: '不正解です' }),
  ).toBeInTheDocument();
});
test.todo(
  '間違いがない場合はクリアのエフェクトと、クリア後のメニューを出す。',
  async () => {
    setup('2_3');
    resolve_2_3({ finish: true });
    await userEvent.click(screen.getByRole('button', { name: 'こたえあわせ' }));
    await userEvent.click(screen.getByRole('button', { name: 'はい' }));
    expect(await screen.findByRole('dialog', { name: 'クリア' }));
  },
);

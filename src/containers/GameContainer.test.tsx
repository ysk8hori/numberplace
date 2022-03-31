import '@testing-library/jest-dom';
import React from 'react';
import ReactModal from 'react-modal';
import { describe, test, expect } from 'vitest';
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

describe('GameContainer', () => {
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
  test('「こたえあわせ」ボタンを押下したら答え合わせするかどうかの確認ダイアログを出す', () => {
    setup('2_3');
    expect(
      screen.queryByRole('dialog', { name: /答え合わせの確認/ }),
    ).not.toBeInTheDocument();
    userEvent.click(screen.getByRole('button', { name: 'こたえあわせ' }));
    expect(
      screen.queryByRole('dialog', { name: /答え合わせの確認/ }),
    ).toBeInTheDocument();
  });
  test('「こたえあわせ」によって正しい Cell のみ fix する', () => {
    setup('2_3');
    userEvent.click(screen.getByTestId('0,0'));
    userEvent.keyboard('6'); // 正答を記入
    userEvent.click(screen.getByTestId('1,1'));
    userEvent.keyboard('6'); // 誤答を記入
    expect(screen.getByTestId('0,0')).not.toHaveAttribute('data-fix'); // 正答を記入したセル
    expect(screen.getByTestId('1,0')).toHaveAttribute('data-fix'); // fix 済みセル
    expect(screen.getByTestId('2,0')).not.toHaveAttribute('data-fix'); // 未記入セル
    expect(screen.getByTestId('1,1')).not.toHaveAttribute('data-fix'); // 誤答を記入したセル
    userEvent.click(screen.getByRole('button', { name: 'こたえあわせ' }));
    userEvent.click(screen.getByRole('button', { name: 'はい' }));
    expect(screen.getByTestId('0,0')).toHaveAttribute('data-fix'); // 正答を記入したセルは fix する
    expect(screen.getByTestId('1,0')).toHaveAttribute('data-fix'); // fix 済みセル
    expect(screen.getByTestId('2,0')).not.toHaveAttribute('data-fix'); // 未記入セル
    expect(screen.getByTestId('1,1')).not.toHaveAttribute('data-fix'); // 誤答を記入したセル
  });
  test('「こたえあわせ」によって誤りのセルや空欄のセルがあった場合はダイアログで通知する', () => {
    setup('2_3');
    userEvent.click(screen.getByTestId('0,0'));
    userEvent.keyboard('6'); // 正答を記入
    userEvent.click(screen.getByTestId('1,1'));
    userEvent.keyboard('6'); // 誤答を記入
    expect(screen.getByTestId('0,0')).not.toHaveAttribute('data-fix'); // 正答を記入したセル
    expect(screen.getByTestId('1,0')).toHaveAttribute('data-fix'); // fix 済みセル
    expect(screen.getByTestId('2,0')).not.toHaveAttribute('data-fix'); // 未記入セル
    expect(screen.getByTestId('1,1')).not.toHaveAttribute('data-fix'); // 誤答を記入したセル
    userEvent.click(screen.getByRole('button', { name: 'こたえあわせ' }));
    userEvent.click(screen.getByRole('button', { name: 'はい' }));
    expect(
      screen.getByRole('dialog', { name: '不正解です' }),
    ).toBeInTheDocument();
  });
  test('誤りのセルや空欄のセルがある状態で「こたえあわせ」を２度連続で行った場合、２度ともダイアログで通知する', () => {
    setup('2_3');
    userEvent.click(screen.getByTestId('0,0'));
    userEvent.keyboard('6'); // 正答を記入
    userEvent.click(screen.getByTestId('1,1'));
    userEvent.keyboard('6'); // 誤答を記入
    expect(screen.getByTestId('0,0')).not.toHaveAttribute('data-fix'); // 正答を記入したセル
    expect(screen.getByTestId('1,0')).toHaveAttribute('data-fix'); // fix 済みセル
    expect(screen.getByTestId('2,0')).not.toHaveAttribute('data-fix'); // 未記入セル
    expect(screen.getByTestId('1,1')).not.toHaveAttribute('data-fix'); // 誤答を記入したセル
    userEvent.click(screen.getByRole('button', { name: 'こたえあわせ' }));
    userEvent.click(screen.getByRole('button', { name: 'はい' }));
    expect(
      screen.getByRole('dialog', { name: '不正解です' }),
    ).toBeInTheDocument();
    userEvent.click(screen.getByRole('button', { name: 'OK' }));
    userEvent.click(screen.getByRole('button', { name: 'こたえあわせ' }));
    userEvent.click(screen.getByRole('button', { name: 'はい' }));
    expect(
      screen.getByRole('dialog', { name: '不正解です' }),
    ).toBeInTheDocument();
  });
  test('間違いがない場合はクリアのエフェクトと、クリア後のメニューを出す。', () => {
    setup('2_3');
    resolve_2_3({ finish: true });
    userEvent.click(screen.getByRole('button', { name: 'こたえあわせ' }));
    userEvent.click(screen.getByRole('button', { name: 'はい' }));
    expect(screen.getByRole('dialog', { name: 'クリア' }));
  });
});

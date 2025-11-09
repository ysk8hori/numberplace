import '@testing-library/jest-dom';
import React from 'react';
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
  TestProvider,
} from '../../utils/test-utils';
import GameContainer from '.';
import { atomOfGame, atomOfSolved } from '../../atoms';

// popover API のモック
// テスト環境では Popover API がサポートされていないため、showPopover/hidePopover をモック化する
beforeEach(() => {
  HTMLElement.prototype.showPopover = vi.fn();
  HTMLElement.prototype.hidePopover = vi.fn();
});

afterEach(() => {
  vi.restoreAllMocks();
});

function setup(size: '2_2' | '2_3') {
  const rendered = render(
    size === '2_2' ? (
      <TestProvider
        initialValues={[
          [
            atomOfGame,
            {
              puzzle: puzzle_2_2,
              blockSize: blockSize_2_2,
              hyper: false,
              cross: false,
            },
          ],
          [atomOfSolved, solved_2_2],
        ]}
      >
        <GameContainer />
      </TestProvider>
    ) : (
      <TestProvider
        initialValues={[
          [
            atomOfGame,
            {
              puzzle: puzzle_2_3,
              blockSize: blockSize_2_3,
              hyper: false,
              cross: false,
            },
          ],
          [atomOfSolved, solved_2_3],
        ]}
      >
        <GameContainer />
      </TestProvider>
    ),
  );
}

test('「答え合わせ」によって正しい Cell のみ fix する', async () => {
  setup('2_3');
  await userEvent.click(screen.getByTestId('0,0'));
  await userEvent.keyboard('6'); // 正答を記入
  await userEvent.click(screen.getByTestId('1,1'));
  await userEvent.keyboard('6'); // 誤答を記入
  expect(screen.getByTestId('0,0')).not.toHaveAttribute('data-fix'); // 正答を記入したセル
  expect(screen.getByTestId('1,0')).toHaveAttribute('data-fix'); // fix 済みセル
  expect(screen.getByTestId('2,0')).not.toHaveAttribute('data-fix'); // 未記入セル
  expect(screen.getByTestId('1,1')).not.toHaveAttribute('data-fix'); // 誤答を記入したセル
  await userEvent.click(screen.getByRole('button', { name: '答え合わせ' }));
  expect(screen.getByTestId('0,0')).toHaveAttribute('data-fix'); // 正答を記入したセルは fix する
  expect(screen.getByTestId('1,0')).toHaveAttribute('data-fix'); // fix 済みセル
  expect(screen.getByTestId('2,0')).not.toHaveAttribute('data-fix'); // 未記入セル
  expect(screen.getByTestId('1,1')).not.toHaveAttribute('data-fix'); // 誤答を記入したセル
});
test('Enter で「答え合わせ」する', async () => {
  setup('2_3');
  await userEvent.click(screen.getByTestId('0,0'));
  await userEvent.keyboard('6'); // 正答を記入
  await userEvent.click(screen.getByTestId('1,1'));
  await userEvent.keyboard('6'); // 誤答を記入
  expect(screen.getByTestId('0,0')).not.toHaveAttribute('data-fix'); // 正答を記入したセル
  expect(screen.getByTestId('1,0')).toHaveAttribute('data-fix'); // fix 済みセル
  expect(screen.getByTestId('2,0')).not.toHaveAttribute('data-fix'); // 未記入セル
  expect(screen.getByTestId('1,1')).not.toHaveAttribute('data-fix'); // 誤答を記入したセル
  // await userEvent.click(screen.getByRole('button', { name: '答え合わせ' }));
  await userEvent.keyboard('{Enter}');
  expect(screen.getByTestId('0,0')).toHaveAttribute('data-fix'); // 正答を記入したセルは fix する
  expect(screen.getByTestId('1,0')).toHaveAttribute('data-fix'); // fix 済みセル
  expect(screen.getByTestId('2,0')).not.toHaveAttribute('data-fix'); // 未記入セル
  expect(screen.getByTestId('1,1')).not.toHaveAttribute('data-fix'); // 誤答を記入したセル
});
test('「答え合わせ」によって誤りのセルや空欄のセルがあった場合はダイアログで通知する', async () => {
  setup('2_3');
  await userEvent.click(screen.getByTestId('0,0'));
  await userEvent.keyboard('6'); // 正答を記入
  await userEvent.click(screen.getByTestId('1,1'));
  await userEvent.keyboard('6'); // 誤答を記入
  expect(screen.getByTestId('0,0')).not.toHaveAttribute('data-fix'); // 正答を記入したセル
  expect(screen.getByTestId('1,0')).toHaveAttribute('data-fix'); // fix 済みセル
  expect(screen.getByTestId('2,0')).not.toHaveAttribute('data-fix'); // 未記入セル
  expect(screen.getByTestId('1,1')).not.toHaveAttribute('data-fix'); // 誤答を記入したセル
  await userEvent.click(screen.getByRole('button', { name: '答え合わせ' }));
  expect(screen.getByText('間違いがあります')).toBeInTheDocument();
});
test('誤りのセルや空欄のセルがある状態で「答え合わせ」を２度連続で行った場合、２度ともダイアログで通知する', async () => {
  setup('2_3');
  await userEvent.click(screen.getByTestId('0,0'));
  await userEvent.keyboard('6'); // 正答を記入
  await userEvent.click(screen.getByTestId('1,1'));
  await userEvent.keyboard('6'); // 誤答を記入
  expect(screen.getByTestId('0,0')).not.toHaveAttribute('data-fix'); // 正答を記入したセル
  expect(screen.getByTestId('1,0')).toHaveAttribute('data-fix'); // fix 済みセル
  expect(screen.getByTestId('2,0')).not.toHaveAttribute('data-fix'); // 未記入セル
  expect(screen.getByTestId('1,1')).not.toHaveAttribute('data-fix'); // 誤答を記入したセル
  await userEvent.click(screen.getByRole('button', { name: '答え合わせ' }));
  expect(screen.getByText('間違いがあります')).toBeInTheDocument();
  // popover は clearMistake で自動的に閉じられる
  await userEvent.click(screen.getByRole('button', { name: '答え合わせ' }));
  expect(screen.getByText('間違いがあります')).toBeInTheDocument();
});
test.todo(
  '間違いがない場合はクリアのエフェクトと、クリア後のメニューを出す。',
  async () => {
    setup('2_3');
    resolve_2_3({ finish: true });
    await userEvent.click(screen.getByRole('button', { name: '答え合わせ' }));
    expect(await screen.findByRole('dialog', { name: 'クリア' }));
  },
);

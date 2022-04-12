import '@testing-library/jest-dom';
import { BlockSize } from '@ysk8hori/numberplace-generator';
import React from 'react';
import ReactModal from 'react-modal';
import { test, expect, fn, vi, SpyInstanceFn } from 'vitest';
import {
  render,
  screen,
  userEvent,
  puzzle_2_3,
  blockSize_2_3,
  corrected_2_3,
  resolve_2_3,
} from './utils/test-utils';
import App from './App';
import useGenerateGame from './useGenerateGame';
import gameHolder from './utils/gameHolder';
import { MyGame } from './utils/typeUtils';

vi.mock('./useGenerateGame', () => ({
  default: fn(() => {
    return { puzzle: puzzle_2_3, corrected: corrected_2_3 };
  }),
}));

function spy(): SpyInstanceFn<
  [BlockSize, number],
  {
    puzzle: MyGame;
    corrected: MyGame;
  }
> {
  return useGenerateGame as any;
}

function generateTimes() {
  return spy().mock.calls.length;
}

function calledWith() {
  return spy().mock.calls.slice(-1)[0][0];
}

function setup() {
  const rendered = render(<App />);
  ReactModal.setAppElement(rendered.container);
}

beforeEach(() => {
  gameHolder.removeSavedGame();
  spy().mockClear();
});

test('ゲーム生成してゲームクリア後に「おなじ おおきさで あそぶ」をクリックするとおなじおおきさのゲームを生成する', async () => {
  setup();
  userEvent.click(
    screen.getByRole('button', { name: '6 かける 6 のサイズを選ぶ' }),
  );
  // useGenerateGame の実行回数をメモしておく
  const times = generateTimes();
  // useGenerateGame が最後に呼ばれた際の第一引数が blockSize_2_3 であることを確認する
  expect(calledWith()).toEqual(
    expect.objectContaining({ blockSize: blockSize_2_3 }),
  );
  expect(
    await screen.findByRole('button', { name: 'こたえあわせ' }),
  ).toBeInTheDocument();
  resolve_2_3({ finish: true });
  userEvent.click(screen.getByRole('button', { name: 'こたえあわせ' }));
  userEvent.click(screen.getByRole('button', { name: 'はい' }));
  userEvent.click(
    screen.getByRole('button', { name: 'おなじ おおきさで あそぶ' }),
  );
  // useGenerateGame の実行回数が増えていることを確認する
  expect(generateTimes()).greaterThan(times);
  // useGenerateGame が最後に呼ばれた際の第一引数が blockSize_2_3 であることを確認する
  expect(calledWith()).toEqual(
    expect.objectContaining({ blockSize: blockSize_2_3 }),
  );
});

test('ゲームロードしてゲームクリア後に「おなじ おおきさで あそぶ」をクリックするとおなじおおきさのゲームを生成する', async () => {
  gameHolder.saveGame({
    blockSize: blockSize_2_3,
    corrected: corrected_2_3,
    puzzle: puzzle_2_3,
  });
  setup();
  expect(
    await screen.findByRole('button', { name: 'こたえあわせ' }),
  ).toBeInTheDocument();
  // useGenerateGame は呼ばれない
  expect(generateTimes()).toBe(0);
  resolve_2_3({ finish: true });
  userEvent.click(screen.getByRole('button', { name: 'こたえあわせ' }));
  userEvent.click(screen.getByRole('button', { name: 'はい' }));
  userEvent.click(
    screen.getByRole('button', { name: 'おなじ おおきさで あそぶ' }),
  );
  // useGenerateGame は実行される
  expect(generateTimes()).greaterThanOrEqual(1);
  // useGenerateGame が最後に呼ばれた際の第一引数が blockSize_2_3 であることを確認する
  expect(calledWith()).toEqual(
    expect.objectContaining({ blockSize: blockSize_2_3 }),
  );
});

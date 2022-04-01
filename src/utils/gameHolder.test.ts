import { it, expect, beforeEach } from 'vitest';
import gameHolder from './gameHolder';
import { corrected_2_2, puzzle_2_2 } from './test-utils';

beforeEach(() => {
  // ゲームの保存状態を初期化する
  gameHolder.removeSavedGame();
});

it('ゲームを保存して取得できる', () => {
  gameHolder.saveGame({ puzzle: puzzle_2_2, corrected: corrected_2_2 });
  const savedGame = gameHolder.loadGame();
  expect(savedGame).toEqual({ puzzle: puzzle_2_2, corrected: corrected_2_2 });
});

it('ゲームを保存していない場合は undefined', () => {
  const savedGame = gameHolder.loadGame();
  expect(savedGame).toBeUndefined();
});

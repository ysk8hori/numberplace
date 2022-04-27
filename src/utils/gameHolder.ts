import { BlockSize } from '@ysk8hori/numberplace-generator';
import { MyGame } from './typeUtils';

const STORAGEKEY_GAME = 'game';
export type SaveData = {
  puzzle: MyGame;
  solved: MyGame;
  blockSize: BlockSize;
  cross?: boolean;
  hyper?: boolean;
};

const gameHolder = {
  /** ゲームを保存する */
  saveGame: function (params: SaveData) {
    localStorage.setItem(STORAGEKEY_GAME, JSON.stringify(params));
  },

  /** 保存してあるゲームを読み込む */
  loadGame: function (): SaveData | undefined {
    const game = localStorage.getItem(STORAGEKEY_GAME);
    if (!game) return undefined;
    try {
      return JSON.parse(game);
    } catch (_) {
      return undefined;
    }
  },

  /** 保存してあるゲームを削除する */
  removeSavedGame: function () {
    localStorage.removeItem(STORAGEKEY_GAME);
  },
};

export default gameHolder;

import { MyGame } from './typeUtils';

const STORAGEKEY_GAME = 'game';
const gameHolder = {
  /** ゲームを保存する */
  saveGame: function (params: { puzzle: MyGame; corrected: MyGame }) {
    localStorage.setItem(STORAGEKEY_GAME, JSON.stringify(params));
  },

  /** 保存してあるゲームを読み込む */
  loadGame: function (): { puzzle: MyGame; corrected: MyGame } | undefined {
    const game = localStorage.getItem(STORAGEKEY_GAME);
    this.removeSavedGame();
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

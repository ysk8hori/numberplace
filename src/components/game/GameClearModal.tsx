import React, { useCallback, useEffect, useState } from 'react';
import Modal from '../atoms/Modal';
import NeumorphismButton from '../atoms/NeumorphismButton';
import Spacer from '../atoms/Spacer';

/**
 * クリアした旨を知らせるモーダル
 *
 * - クリアした旨を表示する
 * - todo: 問題をリトライするコールバックを呼ぶ
 * - 問題を再生成するコールバックを呼ぶ
 * - todo: block size を選択するコールバックを呼ぶ
 */
const GameClearModal: React.FC<{
  /** ゲームをクリアしたかどうかのフラグ。true の場合本モーダルを表示する。 */
  gameClear?: boolean;
  /** 同じサイズで遊ぶコールバック */
  onRegenerate?: () => void;
  /** 他のサイズで遊ぶコールバック */
  onChangeSize?: () => void;
}> = ({ gameClear, onRegenerate, onChangeSize }) => {
  const [isOpen, setOpenState] = useState(false);
  useEffect(() => setOpenState(!!gameClear), [gameClear]);
  const close = useCallback(() => setOpenState(false), [setOpenState]);
  return (
    <Modal isOpen={!!isOpen} contentLabel="クリア">
      <p className="text-center">クリア！</p>
      <Spacer h={3} />
      <div className="grid grid-cols-2 justify-center gap-8">
        {/* <NeumorphismButton
          onClick={() => close()}
          className="p-2 rounded-lg w-full font-black"
        >
          同じ
          <br />
          もんだいを
          <br />
          あそぶ
        </NeumorphismButton> */}
        <NeumorphismButton
          onClick={() => (close(), onRegenerate?.())}
          className="p-2 rounded-lg w-full font-black"
        >
          同じ
          <br />
          大きさで
          <br />
          遊ぶ
        </NeumorphismButton>
        <NeumorphismButton
          onClick={() => (close(), onChangeSize?.())}
          className="p-2 rounded-lg w-full font-black"
        >
          他の
          <br />
          大きさで
          <br />
          遊ぶ
        </NeumorphismButton>
      </div>
    </Modal>
  );
};
export default GameClearModal;

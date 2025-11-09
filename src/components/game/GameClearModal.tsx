import React, { useCallback, useEffect, useState } from 'react';
import Button from '../atoms/Button';

/**
 * クリアした旨を知らせるモーダル
 *
 * - クリアした旨を表示する
 * - todo: 問題をリトライするコールバックを呼ぶ
 * - 問題を再生成するコールバックを呼ぶ
 * - todo: block size を選択するコールバックを呼ぶ
 */
const GameClearModal: React.FC<{
  /** 同じサイズで遊ぶコールバック */
  onRegenerate?: () => void;
  /** 他のサイズで遊ぶコールバック */
  onChangeSize?: () => void;
}> = ({ onRegenerate, onChangeSize }) => {
  const [isOpen, setOpenState] = useState(true);
  const close = useCallback(() => setOpenState(false), [setOpenState]);

  useEffect(() => {
    if (isOpen) {
      (
        document.getElementById('game-clear-modal') as HTMLDialogElement
      ).showModal();
    } else {
      (
        document.getElementById('game-clear-modal') as HTMLDialogElement
      ).close();
    }
  }, [isOpen]);

  return (
    <dialog id="game-clear-modal">
      <p className="text-center">クリア🎉</p>
      <div className="flex flex-col justify-center gap-4">
        <Button variant="text" onClick={() => (close(), onRegenerate?.())}>
          同じ大きさで遊ぶ
        </Button>
        <Button variant="text" onClick={() => (close(), onChangeSize?.())}>
          他の大きさで遊ぶ
        </Button>
      </div>
    </dialog>
  );
};
export default GameClearModal;

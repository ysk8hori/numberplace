import React, { useCallback, useState } from 'react';
import Modal from '../atoms/Modal';
import Button from '../atoms/Button';

/**
 * 答え合わせボタンとモーダル
 *
 * - 「答え合わせ」ボタンを押下したら答え合わせするかどうかの確認モーダルを出す
 * - モーダルの「いいえ」ボタンを押下でモーダルが閉じる
 * - モーダルの「はい」ボタンを押下でモーダルを閉じ答え合わせ開始コールバックを実行する
 */
const Verifying: React.FC<{
  /** 答え合わせ開始コールバック */
  onStartChecking?: () => void;
}> = ({ onStartChecking }) => {
  const [isOpen, setOpenState] = useState(false);
  const open = useCallback(() => setOpenState(true), [setOpenState]);
  const close = useCallback(() => setOpenState(false), [setOpenState]);
  return (
    <>
      <Button onClick={() => open()} className="p-4 rounded-2xl text-2xl">
        答え合わせ
      </Button>
      <Modal isOpen={isOpen} contentLabel="答え合わせの確認">
        <p className="text-center">答え合わせ しますか？</p>
        <div className="w-60 flex gap-4 justify-center">
          <Button onClick={() => close()} className="p-2 w-2/5 font-black">
            いいえ
          </Button>
          <Button
            onClick={() => (close(), onStartChecking?.())}
            className="p-2 w-2/5 font-black"
          >
            はい
          </Button>
        </div>
      </Modal>
    </>
  );
};
export default Verifying;

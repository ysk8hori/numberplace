import React, { useCallback, useState } from 'react';
import Modal from './atoms/Modal';
import NeumorphismButton from './atoms/NeumorphismButton';
import Spacer from './atoms/Spacer';

/**
 * こたえあわせボタンとモーダル
 *
 * - 「こたえあわせ」ボタンを押下したら答え合わせするかどうかの確認モーダルを出す
 * - モーダルの「いいえ」ボタンを押下でモーダルが閉じる
 * - モーダルの「はい」ボタンを押下でモーダルを閉じこたえあわせ開始コールバックを実行する
 */
const Verifying: React.FC<{
  /** こたえあわせ開始コールバック */
  onStartChecking?: () => void;
}> = ({ onStartChecking }) => {
  const [isOpen, setOpenState] = useState(false);
  const open = useCallback(() => setOpenState(true), [setOpenState]);
  const close = useCallback(() => setOpenState(false), [setOpenState]);
  return (
    <>
      <NeumorphismButton onClick={() => open()} className="p-4 rounded-full ">
        こたえあわせ
      </NeumorphismButton>
      <Modal isOpen={isOpen} contentLabel="答え合わせの確認">
        <p className="text-center">こたえあわせ しますか？</p>
        <Spacer h={3} />
        <div className="w-60 flex justify-between">
          <NeumorphismButton
            onClick={() => close()}
            className="p-2 rounded-full w-2/5 font-black"
          >
            いいえ
          </NeumorphismButton>
          <NeumorphismButton
            onClick={() => (close(), onStartChecking?.())}
            className="p-2 rounded-full w-2/5 ml-auto font-black"
          >
            はい
          </NeumorphismButton>
        </div>
      </Modal>
    </>
  );
};
export default Verifying;

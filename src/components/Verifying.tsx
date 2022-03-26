import React, { useCallback, useState } from 'react';
import Modal from './atoms/Modal';
import NeumorphismButton from './atoms/NeumorphismButton';
import Spacer from './atoms/Spacer';

/**
 * こたえあわせボタンとモーダル
 *
 * - 「こたえあわせ」ボタンを押下したら答え合わせするかどうかの確認モーダルを出す
 * - モーダルの「いいえ」ボタンを押下でモーダルが閉じる
 * - モーダルの「はい」ボタンを押下でこたえあわせ開始コールバックを実行する
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
        <p>答え合わせしますか？</p>
        <Spacer />
        <NeumorphismButton onClick={() => close()} className="p-2 rounded-full">
          いいえ
        </NeumorphismButton>
        <NeumorphismButton
          onClick={() => onStartChecking?.()}
          className="p-2 rounded-full"
        >
          はい
        </NeumorphismButton>
      </Modal>
    </>
  );
};
export default Verifying;

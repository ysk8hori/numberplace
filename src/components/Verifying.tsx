import React, { useCallback, useState } from 'react';
import Modal from './atoms/Modal';
import NeumorphismButton from './atoms/NeumorphismButton';
import Spacer from './atoms/Spacer';

/**
 * こたえあわせボタンとモーダル
 *
 * - 「こたえあわせ」ボタンを押下したら答え合わせするかどうかの確認モーダルを出す
 * - モーダルの「いいえ」ボタンを押下するとモーダルが閉じる
 */
export default function Verifying() {
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
        <NeumorphismButton
          onClick={() => close()}
          className="p-2 rounded-full "
        >
          いいえ
        </NeumorphismButton>
      </Modal>
    </>
  );
}

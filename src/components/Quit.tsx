import React, { useCallback, useState } from 'react';
import Modal from './atoms/Modal';
import NeumorphismButton from './atoms/NeumorphismButton';
import Spacer from './atoms/Spacer';

/**
 * ゲームをやめるボタンとモーダル
 *
 * - 「ゲームをやめる」ボタンを押下したら確認モーダルを出す
 * - モーダルの「いいえ」ボタンを押下でモーダルが閉じる
 * - モーダルの「はい」ボタンを押下でモーダルを閉じゲームをやめるコールバックを実行する
 */
const Quit: React.FC<{
  /** ゲームをやめるコールバック */
  onQuit?: () => void;
}> = ({ onQuit }) => {
  const [isOpen, setOpenState] = useState(false);
  const open = useCallback(() => setOpenState(true), [setOpenState]);
  const close = useCallback(() => setOpenState(false), [setOpenState]);
  return (
    <>
      <NeumorphismButton
        onClick={() => open()}
        className="p-4 rounded-full text-2xl"
      >
        ゲームをやめる
      </NeumorphismButton>
      <Modal isOpen={isOpen} contentLabel="ゲームをやめる確認">
        <p className="text-center">ゲームをやめますか？</p>
        <Spacer h={3} />
        <div className="w-60 flex justify-between">
          <NeumorphismButton
            onClick={() => close()}
            className="p-2 rounded-full w-2/5 font-black"
          >
            いいえ
          </NeumorphismButton>
          <NeumorphismButton
            onClick={() => (close(), onQuit?.())}
            className="p-2 rounded-full w-2/5 ml-auto font-black"
          >
            はい
          </NeumorphismButton>
        </div>
      </Modal>
    </>
  );
};
export default Quit;

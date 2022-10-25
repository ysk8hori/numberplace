import React, { useCallback, useState } from 'react';
import Modal from '../atoms/Modal';
import Button from '../atoms/Button';

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
      <Button
        type="outlined"
        onClick={() => open()}
        className="rounded-2xl text-2xl"
      >
        ゲームをやめる
      </Button>
      <Modal isOpen={isOpen} contentLabel="ゲームをやめる確認">
        <p className="text-center">ゲームをやめますか？</p>
        <div className="w-60 flex gap-4 justify-center">
          <Button type="text" onClick={() => close()} className="p-2 w-2/5">
            いいえ
          </Button>
          <Button
            type="text"
            onClick={() => (close(), onQuit?.())}
            className="p-2 w-2/5"
          >
            はい
          </Button>
        </div>
      </Modal>
    </>
  );
};
export default Quit;

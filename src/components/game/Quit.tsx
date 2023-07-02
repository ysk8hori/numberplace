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
        variant="outlined"
        onClick={() => open()}
        className="rounded-2xl text-xl"
      >
        ゲームをやめる
      </Button>
      <Modal isOpen={isOpen} contentLabel="ゲームをやめる確認">
        <p className="text-center">ゲームをやめますか？</p>
        <div className="flex flex-col justify-center gap-4">
          <Button variant="text" onClick={() => (close(), onQuit?.())}>
            はい
          </Button>
          <Button variant="text" onClick={() => close()}>
            いいえ
          </Button>
        </div>
      </Modal>
    </>
  );
};
export default Quit;

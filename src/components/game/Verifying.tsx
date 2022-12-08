import React from 'react';
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
  return (
    <>
      <Button
        variant="outlined"
        onClick={() => onStartChecking?.()}
        className="p-4 rounded-2xl text-2xl"
      >
        答え合わせ
      </Button>
    </>
  );
};
export default Verifying;

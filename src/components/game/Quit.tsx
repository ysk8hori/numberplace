import React, { useCallback, useState } from 'react';
import styles from './Quit.module.scss';

const MODAL_ID = 'quit-confirm-modal';

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
  onCancel?: () => void;
}> = ({ onQuit, onCancel }) => {
  return (
    <>
      <button popoverTarget={MODAL_ID}>ゲームをやめる</button>
      <div className={styles.popoverContainer} id={MODAL_ID} popover="auto">
        <p>ゲームをやめますか？</p>
        <button onClick={onQuit}>はい</button>
        <button popoverTarget={MODAL_ID} popoverTargetAction="hide">
          いいえ
        </button>
      </div>
    </>
  );
};
export default Quit;

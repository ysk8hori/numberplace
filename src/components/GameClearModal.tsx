import React, { useCallback, useEffect, useState } from 'react';
import Modal from './atoms/Modal';
import NeumorphismButton from './atoms/NeumorphismButton';
import Spacer from './atoms/Spacer';

/**
 * クリアした旨を知らせるモーダル
 *
 * - クリアした旨を表示する
 * - 問題をリトライするコールバックを呼ぶ
 * - 問題を再生成するコールバックを呼ぶ
 * - block size を選択するコールバックを呼ぶ
 */
const GameClearModal: React.FC<{ gameClear?: boolean }> = ({ gameClear }) => {
  const [isOpen, setOpenState] = useState(false);
  useEffect(() => setOpenState(!!gameClear), [gameClear]);
  const close = useCallback(() => setOpenState(false), [setOpenState]);
  return (
    <Modal isOpen={!!isOpen} contentLabel="クリア">
      <p className="text-center">クリア！</p>
      <Spacer h={3} />
      <div className="grid grid-cols-2 justify-center gap-8">
        <NeumorphismButton
          onClick={() => close()}
          className="p-2 rounded-lg w-full font-black"
        >
          おなじ
          <br />
          もんだいを
          <br />
          あそぶ
        </NeumorphismButton>
        <NeumorphismButton
          onClick={() => close()}
          className="p-2 rounded-lg w-full font-black"
        >
          おなじ
          <br />
          おおきさで
          <br />
          あそぶ
        </NeumorphismButton>
        <NeumorphismButton
          onClick={() => close()}
          className="p-2 rounded-lg w-full font-black"
        >
          ほかの
          <br />
          おおきさで
          <br />
          あそぶ
        </NeumorphismButton>
      </div>
    </Modal>
  );
};
export default GameClearModal;

import React, { useCallback, useEffect, useState } from 'react';
import Modal from '../atoms/Modal';
import Button from '../atoms/Button';
import Spacer from '../atoms/Spacer';

/**
 * 誤答がある旨を知らせるモーダル
 *
 * - 誤答がある場合はその旨の通知を表示する
 * - 空欄がある場合はその旨の通知を表示する
 */
const MistakeNoticeModal: React.FC<{
  /** 誤答がある */
  mistake?: boolean;
  /** 空欄がある */
  emptycell?: boolean;
  /** OKボタン押下 */
  onOk?: () => void;
}> = ({ mistake, emptycell, onOk }) => {
  const [isOpen, setOpenState] = useState(false);
  useEffect(() => setOpenState(!!mistake || !!emptycell), [mistake, emptycell]);
  const close = useCallback(() => setOpenState(false), [setOpenState]);
  return (
    <Modal isOpen={!!isOpen} contentLabel="不正解です">
      {mistake && <p className="text-center">間違いがあります</p>}
      {emptycell && <p className="text-center">全ての答えを記入してください</p>}
      <div className="flex justify-center">
        <Button
          onClick={() => (close(), onOk?.())}
          className="p-2 w-2/5 font-black"
        >
          OK
        </Button>
      </div>
    </Modal>
  );
};
export default MistakeNoticeModal;

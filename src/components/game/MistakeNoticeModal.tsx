import React, { useCallback, useState } from 'react';
import Modal from '../atoms/Modal';
import Button from '../atoms/Button';

/**
 * 誤答がある旨を知らせるモーダル
 *
 * - 誤答がある場合はその旨の通知を表示する
 */
const MistakeNoticeModal: React.FC<{
  /** OKボタン押下 */
  onOk?: () => void;
}> = ({ onOk }) => {
  const [isOpen, setOpenState] = useState(true);
  const close = useCallback(() => setOpenState(false), [setOpenState]);
  return (
    <Modal isOpen={!!isOpen} contentLabel="不正解です">
      <p className="text-center">間違いがあります</p>
      <div className="flex justify-center">
        <Button variant="text" onClick={() => (close(), onOk?.())}>
          OK
        </Button>
      </div>
    </Modal>
  );
};
export default MistakeNoticeModal;

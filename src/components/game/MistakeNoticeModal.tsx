import React, { useCallback, useEffect, useState } from 'react';
import Modal from '../atoms/Modal';
import Button from '../atoms/Button';

/**
 * 誤答がある旨を知らせるモーダル
 *
 * - 誤答がある場合はその旨の通知を表示する
 */
const MistakeNoticeModal: React.FC<{
  /** 誤答がある */
  mistake?: boolean;
  /** OKボタン押下 */
  onOk?: () => void;
}> = ({ mistake, onOk }) => {
  const [isOpen, setOpenState] = useState(false);
  useEffect(() => setOpenState(!!mistake), [mistake]);
  const close = useCallback(() => setOpenState(false), [setOpenState]);
  return (
    <Modal isOpen={!!isOpen} contentLabel="不正解です">
      {mistake && <p className="text-center">間違いがあります</p>}
      <div className="flex justify-center">
        <Button
          variant="text"
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

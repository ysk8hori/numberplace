import React, { useEffect } from 'react';
import Button from '../atoms/Button';

const MISTAKE_NOTICE_MODAL_ID = 'mistake-notice-modal';

/**
 * 誤答がある旨を知らせるモーダル
 *
 * - 誤答がある場合はその旨の通知を表示する
 */
const MistakeNoticeModal: React.FC<{
  /** OKボタン押下などでミスがある旨をクリアする */
  clearMistake?: () => void;
  hasMistake: boolean;
}> = ({ clearMistake, hasMistake }) => {
  useEffect(() => {
    const popover = document.getElementById(MISTAKE_NOTICE_MODAL_ID);
    if (popover) {
      if (hasMistake) {
        popover.showPopover();
      }
    }
    clearMistake?.();
  }, [hasMistake]);
  return (
    <div id={MISTAKE_NOTICE_MODAL_ID} popover="auto">
      <p className="text-center">間違いがあります</p>
      <div className="flex justify-center">
        <Button
          variant="text"
          onClick={() => {
            document.getElementById(MISTAKE_NOTICE_MODAL_ID)?.hidePopover();
          }}
          className="w-full"
        >
          OK
        </Button>
      </div>
    </div>
  );
};
export default MistakeNoticeModal;

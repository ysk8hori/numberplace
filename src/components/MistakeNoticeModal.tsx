import React, { useCallback, useEffect, useState } from 'react';
import Modal from './atoms/Modal';
import NeumorphismButton from './atoms/NeumorphismButton';
import Spacer from './atoms/Spacer';

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
}> = ({ mistake, emptycell }) => {
  const [isOpen, setOpenState] = useState(false);
  useEffect(() => setOpenState(!!mistake || !!emptycell), [mistake, emptycell]);
  const close = useCallback(() => setOpenState(false), [setOpenState]);
  return (
    <Modal isOpen={!!isOpen} contentLabel="不正解です">
      {mistake && <p className="text-center">まちがいが あるよ</p>}
      {emptycell && <p className="text-center">ぜんぶ こたえてね</p>}
      <Spacer h={3} />
      <div className="w-60 flex justify-center">
        <NeumorphismButton
          onClick={() => close()}
          className="p-2 rounded-full w-2/5 font-black"
        >
          OK
        </NeumorphismButton>
      </div>
    </Modal>
  );
};
export default MistakeNoticeModal;

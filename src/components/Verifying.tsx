import { useCallback, useState } from 'react';
import Modal from './atoms/Modal';
import NeumorphismButton from './atoms/NeumorphismButton';

export default function Verifying() {
  const [isOpen, setOpenState] = useState(false);
  const open = useCallback(() => setOpenState(true), [setOpenState]);
  return (
    <>
      <NeumorphismButton onClick={() => open()} className="p-4 rounded-full ">
        こたえあわせ
      </NeumorphismButton>
      <Modal isOpen={isOpen} contentLabel="答え合わせの確認">
        答え合わせしますか？
      </Modal>
    </>
  );
}

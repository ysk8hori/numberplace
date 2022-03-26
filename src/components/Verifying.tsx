import { useCallback, useState } from 'react';
import { Button } from '../stories/Button';
import Modal from './atoms/Modal';

export default function Verifying() {
  const [isOpen, setOpenState] = useState(false);
  const open = useCallback(() => setOpenState(true), [setOpenState]);
  return (
    <>
      <Button label={'こたえあわせ'} onClick={() => open()} />
      <Modal isOpen={isOpen} contentLabel="答え合わせの確認">
        答え合わせしますか？
      </Modal>
    </>
  );
}

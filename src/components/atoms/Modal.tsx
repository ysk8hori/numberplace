import React from 'react';
import ReactModal from 'react-modal';

/**
モーダルを表示する。

- ReactModal を使用する理由  
  現在のところ、このコンポーネントは単に ReactModal のラッパーである。
  ReactModal はスタイリングだけではなく、他の要素を aria-hidden に設定するなど、モーダルに必要な庶務を行ってくれるので使用している。
  オーバーレイやモーダル自体のスタイルは独自に tailwind でスタイリングしている。
 */
const Modal: React.FC<ReactModal.Props> = ({ children, ...rest }) => (
  <ReactModal
    className="absolute border rounded-lg overflow-auto p-5 bg-white shadow-lg"
    overlayClassName="fixed top-0 left-0 w-full h-full bg-white/40 flex justify-center items-center"
    {...rest}
  >
    {children}
  </ReactModal>
);

export default Modal;

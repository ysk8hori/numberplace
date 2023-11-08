import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Button from '../atoms/Button';
import SelfBuildingSquareSpinner from '../atoms/SelfBuildingSquareSpinner';

/**
 * ゲーム生成時に表示するローディング画面
 */
export default function Generating({
  cancel,
  reGenerate,
}: {
  cancel?: () => void;
  reGenerate?: () => void;
}) {
  const [showCancel, setShowCancel] = useState(false);
  useEffect(() => {
    const id = setTimeout(() => setShowCancel(true), 3000);
    return () => clearTimeout(id);
  });

  return (
    <div className="max-w-lg mx-auto flex flex-col justify-center items-center gap-5">
      <SelfBuildingSquareSpinner />
      <HiddenBox className={showCancel ? 'visible' : undefined}>
        <Button
          variant="outlined"
          onClick={() => cancel?.()}
          className="px-5 py-1"
        >
          キャンセル
        </Button>
        <Button
          variant="outlined"
          onClick={() => reGenerate?.()}
          className="px-5 py-1"
        >
          再生成
        </Button>
      </HiddenBox>
      <HiddenBox className={showCancel ? 'visible' : undefined}>
        <p>
          ゲームの生成に時間がかかる場合があります。ゲームが生成されない場合は再生成を試みるか、キャンセルし他の大きさで遊んでください。
        </p>
      </HiddenBox>
    </div>
  );
}

const HiddenBox = styled.div`
  display: flex;
  gap: 1rem;
  visibility: hidden;
  opacity: 0;
  transition-property: opacity visibility;
  transition-duration: 0.5s;
  &.visible {
    visibility: visible;
    opacity: 1;
  }
`;

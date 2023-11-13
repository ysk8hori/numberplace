import clsx from 'clsx';
import React, { memo, useCallback, useMemo } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  atomOfAnswerImageVariant,
  atomOfGame,
  atomOfInitial,
} from '../../../../atoms';
import Button from '../../Button';
import './MenuStack.scss';
import { toURLSearchParam } from '../../../../utils/URLSearchParamConverter';
import Quit from '../../../game/Quit';
// piyo🐥
export default function MenuStack({
  isShow,
  onSelected,
  className,
  onQuit,
}: {
  isShow: boolean;
  onSelected: () => void;
  className?: string;
  /** ゲームをやめるコールバック */
  onQuit?: () => void;
}) {
  const [variant, setVariant] = useRecoilState(atomOfAnswerImageVariant);
  const initial = useRecoilValue(atomOfInitial);
  const game = useRecoilValue(atomOfGame);
  const onSelectNum = useCallback(
    () => (setVariant('num'), onSelected()),
    [onSelected, setVariant],
  );
  const onSelectIcon = useCallback(
    () => (setVariant('asobi'), onSelected()),
    [onSelected, setVariant],
  );
  const numClass = useMemo(
    () => (variant === 'num' ? 'svg-checked' : 'svg-unchecked'),
    [variant],
  );
  const iconClass = useMemo(
    () => (variant === 'asobi' ? 'svg-checked' : 'svg-unchecked'),
    [variant],
  );
  const containerClass = useMemo(
    () =>
      clsx(className, 'shadow border-zinc-500 rounded p-2 bg-zinc-50 flex-col'),
    [className],
  );
  const QuitButton = memo(() =>
    !initial || !game ? null : <Quit onQuit={onQuit} onCancel={onSelected} />,
  );
  const ShareButton = memo(() => {
    if (!initial || !game) {
      return null;
    }
    if (initial && game && navigator.canShare && navigator.share) {
      return (
        <Button
          className="block text-xl w-full text-left"
          variant="text"
          onClick={() => {
            const params = toURLSearchParam({
              puzzle: initial,
              blockSize: game.blockSize,
              cross: game.cross,
              hyper: game.hyper,
            });
            const url = `${location.origin}/?${params.toString()}`;
            console.log(url);
            if (navigator.canShare({ url })) {
              navigator.share({ url });
            }
            onSelected();
          }}
        >
          シェアする
        </Button>
      );
    } else {
      return (
        <Button
          className="block text-xl w-full text-left"
          variant="text"
          onClick={() => {
            const params = toURLSearchParam({
              puzzle: initial,
              blockSize: game.blockSize,
              cross: game.cross,
              hyper: game.hyper,
            });
            const url = `${location.origin}/?${params.toString()}`;
            console.log(url);
            navigator.clipboard
              .writeText(url)
              .then(() => alert('コピーしました'));
            onSelected();
          }}
        >
          問題のURLをコピー
        </Button>
      );
    }
  });
  return (
    <div
      className={containerClass}
      style={{ display: isShow ? 'flex' : 'none' }}
    >
      <QuitButton />
      <ShareButton />
      <Button
        className="block text-xl w-full text-left"
        variant="text"
        onClick={onSelectNum}
      >
        <span className={numClass}></span>数字で遊ぶ
      </Button>
      <Button
        className="block text-xl w-full text-left"
        variant="text"
        onClick={onSelectIcon}
      >
        <span className={iconClass}></span>アイコンで遊ぶ
      </Button>
    </div>
  );
}

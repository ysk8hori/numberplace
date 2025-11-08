import React, { memo, useCallback } from 'react';
import { atomOfGame, atomOfInitial } from '../../../../atoms';
import styles from './MenuStack.module.scss';
import { toURLSearchParam } from '../../../../utils/URLSearchParamConverter';
import Quit from '../../../game/Quit';
import { useAtom } from 'jotai';
import { atomOfAnswerImageVariant } from '../../../../jotaiAtoms';

export default function MenuStack(props: {
  /** ゲームをやめるコールバック */
  onQuit?: () => void;
  id: string;
}) {
  const [variant, setVariant] = useAtom(atomOfAnswerImageVariant);
  const [initial] = useAtom(atomOfInitial);
  const [game] = useAtom(atomOfGame);
  const QuitButton = memo(() =>
    !initial || !game ? null : <Quit onQuit={props.onQuit} />,
  );

  const createUrl = useCallback(() => {
    if (!initial || !game) {
      return;
    }
    const params = toURLSearchParam({
      puzzle: initial,
      blockSize: game.blockSize,
      cross: game.cross,
      hyper: game.hyper,
    });
    const url = `${location.origin}/?${params.toString()}`;
    console.log(url);
    return url;
  }, [initial, game]);

  const ShareButton = memo(() => {
    if (!initial || !game) {
      return null;
    }
    if (initial && game && navigator.canShare && navigator.share) {
      return (
        <button
          onClick={() => {
            const url = createUrl();
            if (!url) return;
            if (navigator.canShare({ url })) {
              navigator.share({ url });
            }
          }}
        >
          シェアする
        </button>
      );
    } else {
      return (
        <button
          onClick={() => {
            const url = createUrl();
            if (!url) return;
            navigator.clipboard
              .writeText(url)
              .then(() => alert('コピーしました'));
          }}
        >
          問題のURLをコピー
        </button>
      );
    }
  });
  return (
    <div className="popover-menu" id={props.id} popover="auto">
      <ul className={styles.menu}>
        <li>
          <QuitButton />
        </li>
        <li>
          <ShareButton />
        </li>
        <li>
          <button onClick={() => setVariant('num')}>
            <span className={getIconClass(variant, 'num')}></span>
            数字で遊ぶ
          </button>
        </li>
        <li>
          <button onClick={() => setVariant('asobi')}>
            <span className={getIconClass(variant, 'icon')}></span>
            アイコンで遊ぶ
          </button>
        </li>
      </ul>
    </div>
  );
}

function getIconClass(variant: 'num' | 'asobi', target: 'icon' | 'num') {
  if (target === 'num') {
    return variant === 'num' ? styles.svgChecked : styles.svgUnchecked;
  } else {
    return variant === 'asobi' ? styles.svgChecked : styles.svgUnchecked;
  }
}

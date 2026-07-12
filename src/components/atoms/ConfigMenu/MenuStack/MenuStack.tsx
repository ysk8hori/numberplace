import React, { useCallback } from 'react';
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

  const canShowActions = Boolean(initial && game);
  const canShare = canShowActions && Boolean(navigator.share);

  const handleShare = useCallback(() => {
    const url = createUrl();
    if (!url) return;
    if (navigator.canShare({ url })) {
      navigator.share({ url }).catch(err => {
        if (err.name !== 'AbortError') {
          // キャンセル 以外の場合は再スローする
          throw new Error(err.message, { cause: err });
        }
      });
    }
  }, [createUrl]);

  const handleCopyUrl = useCallback(() => {
    const url = createUrl();
    if (!url) return;
    navigator.clipboard.writeText(url).then(() => alert('URLをコピーしました'));
  }, [createUrl]);

  return (
    <div className="popover-menu" id={props.id} popover="auto">
      <ul className={styles.menu}>
        <li>{canShowActions ? <Quit onQuit={props.onQuit} /> : null}</li>

        {canShare ? (
          <li>
            <button onClick={handleShare}>ゲームをシェアする</button>
          </li>
        ) : null}
        <li>
          <button onClick={handleCopyUrl}>ゲームのURLをコピー</button>
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

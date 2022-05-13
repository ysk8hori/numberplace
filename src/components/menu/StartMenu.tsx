import clsx from 'clsx';
import React from 'react';
import BlockSizeButton from './BlockSizeButton';
import backgroundimg from '../../images/top.svg';
import { Difficulty } from '../../utils/difficulty';
import { BlockSize } from '@ysk8hori/numberplace-generator';

/**
 * 選択可能な BlockSize のリスト
 *
 * 以下の目的で設定している
 *
 * - ユーザーの選択肢を減らすことで遊びやすくする
 * - 大きすぎるサイズは負荷が高くクラッシュする場合があるので生成できないようにする
 */
const gameList = [
  { blockSize: { height: 1, width: 3 } },
  { blockSize: { height: 2, width: 2 } },
  { blockSize: { height: 2, width: 3 } },
  { blockSize: { height: 2, width: 3 }, cross: true },
  { blockSize: { height: 3, width: 3 } },
  { blockSize: { height: 3, width: 3 }, cross: true },
  { blockSize: { height: 3, width: 3 }, hyper: true },
  { blockSize: { height: 3, width: 3 }, hyper: true, cross: true },
  { blockSize: { height: 3, width: 4 } },
  { blockSize: { height: 3, width: 4 }, cross: true },
  { blockSize: { height: 4, width: 4 } },
  { blockSize: { height: 4, width: 4 }, cross: true },
];

type Props = {
  onChoseBlockSize?: (
    blockSize: BlockSize,
    difficulty: Difficulty,
    options?: { cross?: boolean; hyper?: boolean },
  ) => void;
} & React.ComponentProps<'div'>;

function StartMenu({ onChoseBlockSize, className, ...rest }: Props) {
  return (
    <div className="max-w-lg mx-auto">
      <div
        className="h-screen bg-scroll bg-no-repeat bg-center bg-contain flex justify-center items-center"
        style={{ backgroundImage: `url(${backgroundimg})` }}
      ></div>
      <div className={clsx('flex flex-col', className)} {...rest}>
        {gameList.map(({ blockSize, cross, hyper }) => (
          <BlockSizeButton
            key={JSON.stringify({ blockSize, cross, hyper })}
            className="m-16"
            blockSize={blockSize}
            onClick={({ difficulty }) =>
              onChoseBlockSize?.(blockSize, difficulty, { cross, hyper })
            }
            cross={cross}
            hyper={hyper}
          />
        ))}
      </div>
    </div>
  );
}

export default StartMenu;

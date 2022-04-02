import clsx from 'clsx';
import React from 'react';
import { ArrayItem } from '../../utils/typeUtils';
import GlassCard from '../atoms/GlassCard';
import BlockSizeButton from './BlockSizeButton';
import backgroundimg from '../../images/il12e.png';

/**
 * 選択可能な BlockSize のリスト
 *
 * 以下の目的で設定している
 *
 * - ユーザーの選択肢を減らすことで遊びやすくする
 * - 大きすぎるサイズは負荷が高くクラッシュする場合があるので生成できないようにする
 */
const blockSizeList = [
  { height: 1, width: 3 } as const,
  { height: 2, width: 2 } as const,
  { height: 2, width: 3 } as const,
  { height: 3, width: 3 } as const,
];

type MyBlockSize = ArrayItem<typeof blockSizeList>;

type Props = {
  onChoseBlockSize?: (blockSize: MyBlockSize) => void;
} & React.ComponentProps<'div'>;

function StartMenu({ onChoseBlockSize, className, ...rest }: Props) {
  return (
    <div className="max-w-lg mx-auto">
      <div
        className="h-screen bg-scroll bg-no-repeat bg-center bg-contain flex justify-center items-center"
        style={{ backgroundImage: `url(${backgroundimg})` }}
      >
        <h1 style={{ color: '#7F7F7F' }}>Numberp</h1>
      </div>
      <div className={clsx('flex flex-col', className)} {...rest}>
        {blockSizeList.map(blockSize => (
          <GlassCard className="m-16 p-16">
            <BlockSizeButton
              blockSize={blockSize}
              onClick={() => onChoseBlockSize?.(blockSize)}
            />
          </GlassCard>
        ))}
      </div>
    </div>
  );
}

export default StartMenu;

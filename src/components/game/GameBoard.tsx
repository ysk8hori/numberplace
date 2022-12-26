import React, { useMemo } from 'react';
import { BlockSize, Position } from '@ysk8hori/numberplace-generator';
import Cell from './cell/Cell';
import { MyGame } from '../../utils/typeUtils';
import clsx from 'clsx';
import { isSamePos } from '../../utils/positionUtils';
import { isSameBlockSize } from '../../utils/blockUtils';
import { useRecoilValue } from 'recoil';
import { atomOfAnswerImageVariant } from '../../atoms';

type Props = {
  /** ナンプレの問題 */
  puzzle: MyGame;
  /** ナンプレのブロックのサイズ */
  blockSize: BlockSize;
  /** セル選択時イベント */
  onSelectCell?: (pos: Position) => void;
  /** 選択中セルの座標 */
  selectedPos?: Position;
  /** ゲームタイプ：クロス */
  cross?: boolean;
  /** ゲームタイプ：HYPER */
  hyper?: boolean;
} & React.ComponentProps<'div'>;

/**
 * ナンプレのゲームを表示するゲームボード。以下の特徴を持つ。
 *
 * - 正方形
 * - 親要素に合わせた大きさで表示する
 * - cell を1つ選択状態にできる
 * - 選択したセルをコールバックで親へ伝えられる
 * - 選択中のセルを指定できる
 * - 変更不可であることをセルに指定できる
 * - cross を指定した場合、斜めグループを表現する
 * - 9x9 のサイズかつ hyper を指定した場合、追加のグループを表現する
 *
 */
const GameBoard: React.FC<Props> = ({
  puzzle,
  blockSize,
  onSelectCell = () => undefined,
  selectedPos,
  className: additionalClassName,
  cross,
  hyper: _hyper,
}) => {
  // hyper は 9x9 のサイズのみ有効
  const hyper = _hyper && isSameBlockSize(blockSize, { width: 3, height: 3 });
  const className = useMemo(
    () =>
      clsx(
        [
          'aspect-square',
          'max-w-screen-sm',
          'max-h-screen',
          'grid',
          generateGridColsClass(blockSize),
          'box-border',
          'border-t-2',
          'border-t-black',
          'border-l-2',
          'border-l-black',
        ],
        additionalClassName,
      ),
    [additionalClassName, blockSize],
  );
  const { upleftDownrightPosList, uprightDownleftPosList } = useCrossPos(
    cross,
    blockSize,
  );
  const answerImageVariant = useRecoilValue(atomOfAnswerImageVariant);
  return (
    <div className={className}>
      {puzzle.cells.map(cell => (
        <Cell
          answer={cell.answer}
          key={JSON.stringify(cell.pos)}
          right={(cell.pos[0] + 1) % blockSize.width === 0}
          bottom={(cell.pos[1] + 1) % blockSize.height === 0}
          data-testid={cell.pos.toString()}
          select={selectedPos ? isSamePos(cell.pos, selectedPos) : false}
          onSelect={() => onSelectCell(cell.pos)}
          fix={cell.isFix}
          blockSize={blockSize}
          memoList={cell.memoList}
          upleftDownright={upleftDownrightPosList.some(pos =>
            isSamePos(cell.pos, pos),
          )}
          uprightDownleft={uprightDownleftPosList.some(pos =>
            isSamePos(cell.pos, pos),
          )}
          hyper={
            hyper &&
            HYPER_GROUP_POSITIONS.some(poss =>
              poss.some(pos => isSamePos(cell.pos, pos)),
            )
          }
          answerImageVariant={answerImageVariant}
        />
      ))}
    </div>
  );
};

function useCrossPos(cross: boolean | undefined, blockSize: BlockSize) {
  const upleftDownrightPosList: Position[] = useMemo(() => {
    if (!cross) return new Array<Position>();
    return new Array(blockSize.height * blockSize.width)
      .fill(0)
      .map((_, i) => [i, i]);
  }, [cross, blockSize]);
  const uprightDownleftPosList: Position[] = useMemo(() => {
    if (!cross) return new Array<Position>();
    return new Array(blockSize.height * blockSize.width)
      .fill(0)
      .map((_, i) => [i, blockSize.height * blockSize.width - 1 - i]);
  }, [cross, blockSize]);
  return { upleftDownrightPosList, uprightDownleftPosList };
}

const HYPER_GROUP_POSITIONS = [
  [
    [1, 1],
    [2, 1],
    [3, 1],
    [1, 2],
    [2, 2],
    [3, 2],
    [1, 3],
    [2, 3],
    [3, 3],
  ],
  [
    [5, 1],
    [6, 1],
    [7, 1],
    [5, 2],
    [6, 2],
    [7, 2],
    [5, 3],
    [6, 3],
    [7, 3],
  ],
  [
    [1, 5],
    [2, 5],
    [3, 5],
    [1, 6],
    [2, 6],
    [3, 6],
    [1, 7],
    [2, 7],
    [3, 7],
  ],
  [
    [5, 5],
    [6, 5],
    [7, 5],
    [5, 6],
    [6, 6],
    [7, 6],
    [5, 7],
    [6, 7],
    [7, 7],
  ],
] as const;

/**
 * gird-cols-n の tailwind クラスを決定する。
 *
 * @param BlockSize
 * @returns gird-cols-n の tailwind クラス
 */
function generateGridColsClass({
  width,
  height,
}: {
  width: number;
  height: number;
}) {
  return `grid-cols-wrap-${width * height}`;
}

export default GameBoard;

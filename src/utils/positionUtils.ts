import { Position } from '@ysk8hori/numberplace-generator';

export function isSamePos(a: Position, b: Position): boolean {
  return a[0] === b[0] && a[1] === b[1];
}

/**
 * 現在の座標から、指定した数移動した座標を返却する。
 * そのゲームの端の座標値を超える場合はループする。
 *
 * @param pos 現在の座標
 * @param num 移動する数
 * @param size ゲーム側面のサイズ（幅や高さ）
 */
export function moveX({
  pos,
  num,
  size,
}: {
  pos: Position;
  num: number;
  size: number;
}): Position {
  const _num = num % size;
  const nextX = pos[0] + _num;
  return nextX < 0
    ? [nextX + size, pos[1]]
    : nextX < size
    ? [nextX, pos[1]]
    : [nextX - size, pos[1]];
}

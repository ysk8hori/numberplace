import { Position } from '@ysk8hori/numberplace-generator';

export function isSamePos(a: Position, b: Position): boolean {
  return a[0] === b[0] && a[1] === b[1];
}

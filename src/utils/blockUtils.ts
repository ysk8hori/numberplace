import { BlockSize } from '@ysk8hori/numberplace-generator';

export function isSameBlockSize(a: BlockSize, b: BlockSize): boolean {
  return a.width === b.width && a.height === b.height;
}

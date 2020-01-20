import BaseHeight from '@/business/valueobject/baseHeight';
import BaseWidth from '@/business/valueobject/baseWidth';
import Game from '@/business/entity/game';

export default class GameSize {
  public static MAX_SIZE = 10;
  public static create(
    baseHeight: number,
    baseWidth: number
  ): GameSize | string {
    const oneSideLength = baseHeight * baseWidth;
    return Number.isNaN(oneSideLength)
      ? 'Please chose base-height and base-width.'
      : GameSize.MAX_SIZE < oneSideLength
      ? 'Please chose smaller size.'
      : new GameSize(
          BaseHeight.create(baseHeight),
          BaseWidth.create(baseWidth)
        );
  }
  constructor(private baseHeight: BaseHeight, private baseWidth: BaseWidth) {}
  public get size(): number {
    return this.baseHeight.value * this.baseWidth.value;
  }
  public get gameSizeString(): string {
    return `${this.size} x ${this.size}`;
  }
}

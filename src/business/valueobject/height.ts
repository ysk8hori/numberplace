import BaseHeight from '@/business/valueobject/baseHeight';
import BaseWidth from '@/business/valueobject/baseWidth';

/**
 * GameBoard全体の縦幅
 */
export default class Height {
  public get value(): number {
    return this._value;
  }
  private constructor(private _value: number) {}
  public static create(baseHeight: BaseHeight, baseWidth: BaseWidth): Height {
    return new Height(baseHeight.value * baseWidth.value);
  }
  public equals(other: Height): boolean {
    return this.value === other.value;
  }
}

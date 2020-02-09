export default class CellWidth {
  public static create(windowInnerWidth: number): CellWidth {
    return new CellWidth(windowInnerWidth);
  }
  private constructor(public readonly value: number) {}
  public getPixels(): string {
    return `${this.value}px`;
  }
}

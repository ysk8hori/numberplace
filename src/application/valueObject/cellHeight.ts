export default class CellHeight {
  public static create(windowInnerHeight: number): CellHeight {
    return new CellHeight(windowInnerHeight);
  }
  private constructor(public readonly value: number) {}
  public getPixels(): string {
    return `${this.value}px`;
  }
}

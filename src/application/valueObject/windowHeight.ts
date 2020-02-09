export default class WindowHeight {
  public static create(windowInnerHeight: number): WindowHeight {
    return new WindowHeight(windowInnerHeight);
  }
  private constructor(public readonly value: number) {}
  public getPixels(): string {
    return `${this.value}px`;
  }
}

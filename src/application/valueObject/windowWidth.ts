export default class WindowWidth {
  public static create(windowInnerWidth: number): WindowWidth {
    return new WindowWidth(windowInnerWidth);
  }
  private constructor(public readonly value: number) {}
  public getPixels(): string {
    return `${this.value}px`;
  }
}

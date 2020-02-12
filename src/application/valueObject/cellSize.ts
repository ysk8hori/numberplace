import GameSize from '../entity/gameSize';

export default class CellSize {
  public static create(gameSize: GameSize, baseSize: number): CellSize {
    return new CellSize(baseSize / (gameSize.size + 3));
  }
  private constructor(public readonly value: number) {}
  public getPixels(): string {
    return `${this.value}px`;
  }
}

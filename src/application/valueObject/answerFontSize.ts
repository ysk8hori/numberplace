import GameSize from '../entity/gameSize';

export default class AnswerFontSize {
  public static create(gameSize: GameSize, baseSize: number): AnswerFontSize {
    return new AnswerFontSize((baseSize / (gameSize.size + 3)) * 0.8);
  }
  private constructor(public readonly value: number) {}
  public getPixels(): string {
    return `${this.value}px`;
  }
}

import CellSize from './cellSize';
import AnswerFontSize from './answerFontSize';
import GameSize from '../entity/gameSize';

export default class CellStyle {
  public static create(gameSize: GameSize, baseSize: number): CellStyle {
    return new CellStyle(
      CellSize.create(gameSize, baseSize),
      AnswerFontSize.create(gameSize, baseSize)
    );
  }
  private constructor(
    public readonly cellSize: CellSize,
    public readonly answerFontSize: AnswerFontSize
  ) {}
  public getStyle(): { width: string; height: string; fontSize: string } {
    return {
      width: this.cellSize.getPixels(),
      height: this.cellSize.getPixels(),
      fontSize: this.answerFontSize.getPixels()
    };
  }
}

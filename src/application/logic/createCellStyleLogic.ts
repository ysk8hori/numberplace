import WindowHeight from '../valueObject/windowHeight';
import WindowWidth from '../valueObject/windowWidth';
import GameSize from '../entity/gameSize';
import CellStyle from '../valueObject/cellStyle';
import CellSize from '../valueObject/cellSize';
import AnswerFontSize from '../valueObject/answerFontSize';

export default class CalcCellStyleLogic {
  public static create(
    windowHeight: WindowHeight,
    windowWidth: WindowWidth,
    gameSize: GameSize
  ): CalcCellStyleLogic {
    return new CalcCellStyleLogic(windowHeight, windowWidth, gameSize);
  }

  constructor(
    private windowHeight: WindowHeight,
    private windowWidth: WindowWidth,
    private gameSize: GameSize
  ) {}

  public execute(): CellStyle {
    const baseSize = Math.min(this.windowHeight.value, this.windowWidth.value);
    return CellStyle.create(this.gameSize, baseSize);
  }
}

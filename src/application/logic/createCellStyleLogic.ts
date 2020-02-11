import WindowHeight from '../valueObject/windowHeight';
import WindowWidth from '../valueObject/windowWidth';
import CellWidth from '../valueObject/cellWidth';
import CellHeight from '../valueObject/cellHeight';
import GameSize from '../entity/gameSize';
import CellStyle from '../valueObject/cellStyle';

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
    const cellSize = baseSize / (this.gameSize.size + 3);
    return CellStyle.create(
      CellHeight.create(cellSize),
      CellWidth.create(cellSize)
    );
  }
}

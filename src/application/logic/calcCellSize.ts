import WindowHeight from '../valueObject/windowHeight';
import WindowWidth from '../valueObject/windowWidth';
import CellWidth from '../valueObject/cellWidth';
import CellHeight from '../valueObject/cellHeight';
import GameSize from '../entity/gameSize';
import CellSize from '../valueObject/cellSize';

export default class CalcCellSize {
  public static create(
    windowHeight: WindowHeight,
    windowWidth: WindowWidth,
    gameSize: GameSize
  ): CalcCellSize {
    return new CalcCellSize(windowHeight, windowWidth, gameSize);
  }

  constructor(
    private windowHeight: WindowHeight,
    private windowWidth: WindowWidth,
    private gameSize: GameSize
  ) {}

  public execute(): CellSize {
    const baseSize = Math.min(this.windowHeight.value, this.windowWidth.value);
    const cellSize = baseSize / (this.gameSize.size + 3);
    return CellSize.create(
      CellHeight.create(cellSize),
      CellWidth.create(cellSize)
    );
  }
}

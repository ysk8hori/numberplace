import CellHeight from './cellHeight';
import CellWidth from './cellWidth';

export default class CellSize {
  public static create(cellHeight: CellHeight, cellWidth: CellWidth): CellSize {
    return new CellSize(cellHeight, cellWidth);
  }
  private constructor(
    public readonly cellHeight: CellHeight,
    public readonly cellWidth: CellWidth
  ) {}
}

import CellHeight from './cellHeight';
import CellWidth from './cellWidth';

export default class CellStyle {
  public static create(
    cellHeight: CellHeight,
    cellWidth: CellWidth
  ): CellStyle {
    return new CellStyle(cellHeight, cellWidth);
  }
  private constructor(
    public readonly cellHeight: CellHeight,
    public readonly cellWidth: CellWidth
  ) {}
}

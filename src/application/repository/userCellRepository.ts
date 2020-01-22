import CellPosition from '@/business/valueobject/cellPosition';
import UserCell from '../entity/userCell';
import CellNotFoundError from '@/business/cellNotFoundError';
export default class UserCellRepository {
  public static userCells: UserCell[] = [];
  public static push(userCell: UserCell) {
    this.userCells.push(userCell);
  }
  public static findByPosition(position: CellPosition): UserCell {
    return (
      this.userCells.find(cell => cell.position.equals(position)) ??
      CellNotFoundError.throw()
    );
  }
  public static clear() {
    this.userCells = [];
  }
}

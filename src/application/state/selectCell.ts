import UserCell from '../entity/userCell';
import UserCellRepository from '../repository/userCellRepository';
import { autoInjectable, inject } from 'tsyringe';
import { pos } from '@/business/valueobject/cellPosition';

export default class SelectCell {
  public static get instance() {
    return new SelectCell();
  }
  private selectedCell: UserCell;
  private constructor() {
    this.selectedCell = UserCellRepository.findByPosition(pos(0, 0));
  }
  public isSelectedCell(userCell: UserCell) {
    return this.selectedCell.position.equals(userCell.position);
  }
}

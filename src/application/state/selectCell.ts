import UserCell from '../entity/userCell';
import UserCellRepository from '../repository/userCellRepository';
import { autoInjectable, inject } from 'tsyringe';
import { pos } from '@/business/valueobject/cellPosition';
import { Trace } from '@/utils/trace';

export default class SelectCell {
  private static _instance?: SelectCell;
  public static get instance() {
    if (!this._instance) {
      this._instance = new SelectCell();
    }
    return this._instance;
  }
  private _selectedCell: UserCell;
  public get selectedCell(): UserCell {
    return this._selectedCell;
  }
  public set selectedCell(value: UserCell) {
    this._selectedCell = value;
  }
  private constructor() {
    this._selectedCell = UserCellRepository.findByPosition(pos(0, 0));
  }
  public isSelectedCell(userCell: UserCell) {
    return this.selectedCell.position.equals(userCell.position);
  }
  public select(userCell: UserCell) {
    if (userCell.position.equals(this.selectedCell.position)) return;
    this.selectedCell.unselect();
    this.selectedCell = userCell;
  }
}

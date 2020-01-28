import UserCell from '../entity/userCell';
import UserCellRepository from '../repository/userCellRepository';
import { autoInjectable, inject } from 'tsyringe';
import { pos } from '@/business/valueobject/cellPosition';
import BusinessError from '@/business/businessError';
import GameID from '@/business/valueobject/gameId';

@autoInjectable()
export default class SelectCell {
  private static instanceMap: Map<GameID, SelectCell> = new Map<
    GameID,
    SelectCell
  >();
  public static getInstance(gameId: GameID): SelectCell {
    if (!SelectCell.instanceMap.has(gameId)) {
      SelectCell.instanceMap.set(gameId, new SelectCell(gameId));
    }
    return SelectCell.instanceMap.get(gameId)!;
  }

  private selectedCell: UserCell;
  constructor(
    gameId: GameID,
    @inject('UserCellRepository')
    userCellRepository?: UserCellRepository
  ) {
    if (!userCellRepository) {
      BusinessError.throw(
        SelectCell.name,
        'constructor',
        'リポジトリが指定されていません。'
      );
    }
    this.selectedCell = userCellRepository.findByPosition(gameId, pos(0, 0));
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

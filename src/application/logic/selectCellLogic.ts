import CellPosition from '@/core/valueobject/cellPosition';
import { autoInjectable, inject } from 'tsyringe';
import UserCellRepository from '../repository/userCellRepository';
import BusinessError from '@/core/businessError';
import UserCell from '../entity/userCell';
import GameID from '@/core/valueobject/gameId';
import Logic from './logic';

@autoInjectable()
export default class SelectCellLogic implements Logic {
  public static create(
    gameId: GameID,
    position: CellPosition
  ): SelectCellLogic {
    return new SelectCellLogic(gameId, position);
  }
  constructor(
    private gameId: GameID,
    private position: CellPosition,
    @inject('UserCellRepository') userCellRepository?: UserCellRepository
  ) {
    if (!userCellRepository) {
      BusinessError.throw(
        SelectCellLogic.name,
        'constructor',
        'リポジトリが指定されていません。'
      );
    }
    this.userCellRepository = userCellRepository;
  }
  private userCellRepository: UserCellRepository;

  public execute() {
    this.userCellRepository.findSelectedCell(this.gameId)?.unselect();
    this.userCellRepository.findByPosition(this.gameId, this.position).select();
  }
}

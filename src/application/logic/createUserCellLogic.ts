import GameID from '@/business/valueobject/gameId';
import { autoInjectable, inject } from 'tsyringe';
import CellRepository from '@/business/repository/cellRepository';
import GroupRepository from '@/business/repository/groupRepository';
import GameRepository from '@/business/repository/gameRepository';
import BusinessError from '@/business/businessError';
import DeleteGameLogic from '@/business/logic/deleteGameLogic';
import UserCellRepository from '../repository/userCellRepository';
import UserCell from '../entity/userCell';

@autoInjectable()
export default class CreateUserCellLogic {
  public static createAndExecute(gameId: GameID) {
    new CreateUserCellLogic(gameId).execute();
  }
  constructor(
    private gameId: GameID,
    @inject('CellRepository')
    cellRepository?: CellRepository
  ) {
    if (!cellRepository) {
      BusinessError.throw(
        DeleteGameLogic.name,
        'constructor',
        'リポジトリが指定されていません。'
      );
    }
    this.cellRepository = cellRepository;
  }
  private cellRepository: CellRepository;

  public execute() {
    this.cellRepository.findAll(this.gameId).forEach(cell => {
      UserCellRepository.push(UserCell.create(cell));
    });
  }
}

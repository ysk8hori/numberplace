import GameID from '@/business/valueobject/gameId';
import { autoInjectable, inject } from 'tsyringe';
import CellRepository from '@/business/repository/cellRepository';
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
    cellRepository?: CellRepository,
    @inject('userCellRepository')
    userCellRepository?: UserCellRepository
  ) {
    if (!cellRepository || !userCellRepository) {
      BusinessError.throw(
        DeleteGameLogic.name,
        'constructor',
        'リポジトリが指定されていません。'
      );
    }
    this.cellRepository = cellRepository;
    this.userCellRepository = userCellRepository;
  }
  private cellRepository: CellRepository;
  private userCellRepository: UserCellRepository;

  public execute() {
    this.cellRepository.findAll(this.gameId).forEach(cell => {
      this.userCellRepository.push(
        this.gameId,
        UserCell.create(this.gameId, cell)
      );
    });
  }
}

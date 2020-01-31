import CellPosition from '@/business/valueobject/cellPosition';
import { autoInjectable, inject } from 'tsyringe';
import UserCellRepository from '../repository/userCellRepository';
import BusinessError from '@/business/businessError';
import UserCell from '../entity/userCell';
import GameID from '@/business/valueobject/gameId';
import Answer from '@/business/valueobject/answer';
import Logic from './logic';

@autoInjectable()
export default class UserAnswerLogic implements Logic {
  public static create(gameId: GameID, answer: Answer): UserAnswerLogic {
    return new UserAnswerLogic(gameId, answer);
  }
  constructor(
    private gameId: GameID,
    private answer: Answer,
    @inject('userCellRepository') userCellRepository?: UserCellRepository
  ) {
    if (!userCellRepository) {
      BusinessError.throw(
        UserAnswerLogic.name,
        'constructor',
        'リポジトリが指定されていません。'
      );
    }
    this.userCellRepository = userCellRepository;
  }
  private userCellRepository: UserCellRepository;

  public execute() {
    this.userCellRepository
      .findSelectedCell(this.gameId)
      ?.setAnswer(this.answer);
  }
}

import { autoInjectable, inject } from 'tsyringe';
import UserCellRepository from '../repository/userCellRepository';
import BusinessError from '@/business/businessError';
import GameID from '@/business/valueobject/gameId';
import Answer from '@/business/valueobject/answer';
import Logic from './logic';
import CellRepository from '@/business/repository/cellRepository';
import InfiniteAnalyzeLogic from '@/business/logic/analyze/infiniteAnalyze/infiniteAnalyzeLogic';
import OutputAnswerStringLogic from '@/business/logic/outputAnswerStringLogic';

@autoInjectable()
export default class UserAnswerLogic implements Logic {
  private static clearCallback?: () => void;
  private static failureCallback?: () => void;
  public static setClearCallback(callback: () => void) {
    this.clearCallback = callback;
  }
  public static setFailureCallback(callback: () => void) {
    this.failureCallback = callback;
  }
  public static create(gameId: GameID, answer: Answer): UserAnswerLogic {
    return new UserAnswerLogic(gameId, answer);
  }
  constructor(
    private gameId: GameID,
    private answer: Answer,
    @inject('CellRepository') cellRepository?: CellRepository,
    @inject('UserCellRepository') userCellRepository?: UserCellRepository
  ) {
    if (!userCellRepository || !cellRepository) {
      BusinessError.throw(
        UserAnswerLogic.name,
        'constructor',
        'リポジトリが指定されていません。'
      );
    }
    this.userCellRepository = userCellRepository;
    this.cellRepository = cellRepository;
  }
  private userCellRepository: UserCellRepository;
  private cellRepository: CellRepository;

  public execute() {
    this.userCellRepository
      .findSelectedCell(this.gameId)
      ?.setAnswer(this.answer);
    const userCells = this.userCellRepository.findAll(this.gameId);
    if (!userCells.every(cell => cell.isAnswered)) {
      return;
    }

    InfiniteAnalyzeLogic.createAndExecute(this.gameId);
    console.log(OutputAnswerStringLogic.create(this.gameId).getAnswerString());
    const cells = this.cellRepository.findAll(this.gameId);
    cells.every(cell => {
      return cell.answer!.equals(
        userCells.find(userCell => cell.position.equals(userCell.position))!
          .answer!
      );
    })
      ? UserAnswerLogic.clearCallback!()
      : UserAnswerLogic.failureCallback!();
  }
}

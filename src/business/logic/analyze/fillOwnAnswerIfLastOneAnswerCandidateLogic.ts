import { inject, autoInjectable } from 'tsyringe';
import CellRepository from '@/business/repository/cellRepository';
import BusinessError from '@/business/businessError';
import GameID from '@/business/valueobject/gameId';

@autoInjectable()
export default class FillOwnAnswerIfLastOneAnswerCandidate {
  public static create(gameId: GameID): FillOwnAnswerIfLastOneAnswerCandidate {
    return new FillOwnAnswerIfLastOneAnswerCandidate(gameId);
  }
  constructor(
    private gameId: GameID,
    @inject('CellRepository')
    cellRepository?: CellRepository
  ) {
    if (!cellRepository)
      BusinessError.throw(
        FillOwnAnswerIfLastOneAnswerCandidate.name,
        'constructor',
        'リポジトリが指定されていません。'
      );
    this.cellRepository = cellRepository;
  }
  private cellRepository: CellRepository;
  public execute() {
    this.cellRepository
      .findAll(this.gameId)
      .forEach(cell => cell.fillOwnAnswerIfLastOneAnswerCandidate());
  }
}

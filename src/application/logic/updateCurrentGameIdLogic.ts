import GameID from '@/business/valueobject/gameId';
import { autoInjectable, inject } from 'tsyringe';
import GameIdRepository from '../repository/gameIdRepository';
import BusinessError from '@/business/businessError';

@autoInjectable()
export default class UpdateCurrentGameIdLogic {
  public static create(gameId: GameID): UpdateCurrentGameIdLogic {
    return new UpdateCurrentGameIdLogic(gameId);
  }
  constructor(
    private gameId: GameID,
    @inject('GameIdRepository') gameIdRepository?: GameIdRepository
  ) {
    if (!gameIdRepository) {
      BusinessError.throw(
        UpdateCurrentGameIdLogic.name,
        'constructor',
        'リポジトリが指定されていません。'
      );
    }
    this.gameIdRepository = gameIdRepository;
  }
  private gameIdRepository: GameIdRepository;

  public execute() {
    this.gameIdRepository.setCurrentGameId(this.gameId);
  }
}

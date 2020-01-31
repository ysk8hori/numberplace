import { Trace } from '@/utils/trace';
import SelectCellLogic from '../logic/selectCellLogic';
import Logic from '../logic/logic';
import { inject, autoInjectable } from 'tsyringe';
import UserCellRepository from '../repository/userCellRepository';
import BusinessError from '@/business/businessError';
import GameID from '@/business/valueobject/gameId';
import { pos } from '@/business/valueobject/cellPosition';
import GameIdRepository from '../repository/gameIdRepository';

@autoInjectable()
export default class KeyPressEvent {
  public static createLogic(event: KeyboardEvent): Logic | undefined {
    return new KeyPressEvent(event).createSelectCellLogic();
  }
  constructor(
    private event: KeyboardEvent,
    @inject('userCellRepository') userCellRepository?: UserCellRepository,
    @inject('GameIdRepository') gameIdRepository?: GameIdRepository
  ) {
    if (!userCellRepository || !gameIdRepository) {
      BusinessError.throw(
        KeyPressEvent.name,
        'constructor',
        'リポジトリが指定されていません。'
      );
    }
    this.userCellRepository = userCellRepository;
    this.gameIdRepository = gameIdRepository;
  }
  private userCellRepository: UserCellRepository;
  private gameIdRepository: GameIdRepository;

  private isArrowKey(): boolean {
    return true;
  }
  @Trace
  private createSelectCellLogic(): SelectCellLogic | undefined {
    const gameId = this.gameIdRepository.getCurrentGameId();
    if (!gameId) return;
    //  this.userCellRepository.findSelectedCell(this.gameId);
    return SelectCellLogic.create(gameId, pos(this.num++, 0));
  }
  private num = 0;
}

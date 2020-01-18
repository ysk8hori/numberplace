import { autoInjectable, inject } from 'tsyringe';
import GameID from '@/business/valueobject/gameId';
import CreateGameLogic from './createGameLogic';
import CellRepository from '@/business/repository/cellRepository';
import GroupRepository from '@/business/repository/groupRepository';
import GameRepository from '@/business/repository/gameRepository';
import BusinessError from '@/business/businessError';
import Game from '@/business/entity/game';
import BaseHeight from '@/business/valueobject/baseHeight';
import BaseWidth from '@/business/valueobject/baseWidth';

@autoInjectable()
export default class CreateGoodGameLogic {
  public static create(
    baseHeight: BaseHeight,
    baseWidth: BaseWidth
  ): CreateGoodGameLogic {
    return new CreateGoodGameLogic(baseHeight, baseWidth);
  }
  constructor(
    private baseHeight: BaseHeight,
    private baseWidth: BaseWidth,
    @inject('CellRepository')
    cellRepository?: CellRepository,
    @inject('GroupRepository')
    groupRepository?: GroupRepository,
    @inject('GameRepository')
    gameRepository?: GameRepository
  ) {
    if (!cellRepository || !groupRepository || !gameRepository)
      BusinessError.throw(
        CreateGameLogic.name,
        'constructor',
        'リポジトリが指定されていません。'
      );
    this.cellRepository = cellRepository;
    this.game = Game.create(baseHeight, baseWidth);
  }
  private cellRepository: CellRepository;
  private game: Game;

  public execute(): GameID {
    let createdGameId;
    do {
      createdGameId = CreateGameLogic.create(
        this.baseHeight,
        this.baseWidth
      ).execute();
      console.log(`this is Good? :${this.isGood(createdGameId)}`);
    } while (!this.isGood(createdGameId));
    return createdGameId;
  }

  /**
   * 解答済みのセルの数が全セルの半分より少なければGOOD!
   * @param createdGameId
   */
  private isGood(createdGameId: GameID) {
    const allCell = this.cellRepository.findAll(createdGameId);
    return (
      allCell.filter(cell => cell.isAnswered).length < allCell.length / 2 + 5
    );
  }
}

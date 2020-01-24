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
import DeleteGameLogic from '../deleteGameLogic';
import AnalyzeTimeoutError from '../analyze/infiniteAnalyze/analyzeTimeoutError';
import { Trace } from '@/utils/trace';
import TentativeAnalyzer from '../analyze/infiniteAnalyze/tentativeAnalyzer';

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
    TentativeAnalyzer.cancelCancel();
    if (!cellRepository || !groupRepository || !gameRepository)
      BusinessError.throw(
        CreateGameLogic.name,
        'constructor',
        'リポジトリが指定されていません。'
      );
    this.cellRepository = cellRepository;
  }
  private cellRepository: CellRepository;
  private createGameLogic?: CreateGameLogic;

  @Trace
  private cancel() {
    TentativeAnalyzer.cancel();
  }

  private timer?: number;
  @Trace
  private setCancelTimer() {
    this.timer = setTimeout(() => {
      console.log('setCancelTimer');
      this.cancel();
    }, AnalyzeTimeoutError.TIMEOUT_MILLIS);
  }

  @Trace
  private cancelCancelTimer() {
    setTimeout(() => {
      if (this.timer !== undefined) clearTimeout(this.timer);
    }, 100);
  }

  public async execute(): Promise<GameID> {
    this.setCancelTimer();
    let createdGameId;
    do {
      this.createGameLogic = CreateGameLogic.create(
        this.baseHeight,
        this.baseWidth
      );
      createdGameId = await this.createGameLogic.execute();
      console.log(`this is Good? :${this.isGood(createdGameId, false)}`);
    } while (!this.isGood(createdGameId));
    this.cancelCancelTimer();
    return createdGameId;
  }

  /**
   * 解答済みのセルの数が全セルの半分より少なければGOOD!
   * @param createdGameId
   */
  private isGood(createdGameId: GameID, remove: boolean = true) {
    const allCell = this.cellRepository.findAll(createdGameId);
    if (
      allCell.filter(cell => cell.isAnswered).length <
      allCell.length / 2 + allCell.length / 10
    ) {
      //good
      return true;
    } else {
      //bad
      if (remove) DeleteGameLogic.create().execute(createdGameId);
      return false;
    }
  }
}

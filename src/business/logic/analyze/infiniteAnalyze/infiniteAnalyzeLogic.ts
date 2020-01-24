import GameID from '../../../valueobject/gameId';
import { inject, autoInjectable } from 'tsyringe';
import CellRepository from '../../../repository/cellRepository';
import GroupRepository from '../../../repository/groupRepository';
import GameRepository from '../../../repository/gameRepository';
import BusinessError from '../../../businessError';
import TentativeAnalyzer from './tentativeAnalyzer';
import Game from '@/business/entity/game';
import Difficalty from '@/business/valueobject/difficalty';
import DeleteGameLogic from '../../deleteGameLogic';

@autoInjectable()
export default class InfiniteAnalyzeLogic {
  public static create(
    gameId: GameID,
    isCreate: boolean = false
  ): InfiniteAnalyzeLogic {
    return new InfiniteAnalyzeLogic(gameId, isCreate);
  }

  constructor(
    private gameId: GameID,
    private isCreate: boolean,
    @inject('CellRepository')
    cellRepository?: CellRepository,
    @inject('GroupRepository')
    groupRepository?: GroupRepository,
    @inject('GameRepository')
    gameRepository?: GameRepository
  ) {
    if (!cellRepository || !groupRepository || !gameRepository)
      BusinessError.throw(
        InfiniteAnalyzeLogic.name,
        'constructor',
        'リポジトリが指定されていません。'
      );
    this.cellRepository = cellRepository;
    this.gameRepository = gameRepository;
    this.game = gameRepository.find(this.gameId);
    this.tentativeAnalyzer = TentativeAnalyzer.create(
      this.gameId,
      this.isCreate
    );
  }
  private cellRepository: CellRepository;
  private gameRepository: GameRepository;
  private game: Game;
  private deleteGameLogic = DeleteGameLogic.create();
  private tentativeAnalyzer: TentativeAnalyzer;

  public async execute() {
    TentativeAnalyzer.count = 0;
    // 難易度を初期化
    this.game.setDifficalty(Difficalty.create());
    console.log('InfiniteAnalyzeLogic start');
    await this.tentativeAnalyzer.execute();
    console.log('tentativeAnalyzer.executed');
    if (this.tentativeAnalyzer.successGameId) {
      this.gameRepository
        .find(this.gameId)
        .setDifficalty(
          this.gameRepository.find(this.tentativeAnalyzer.successGameId)
            .difficalty
        );
      this.cellRepository
        .findAll(this.tentativeAnalyzer.successGameId)
        .forEach(analyzedCell => {
          const cell = this.cellRepository.findByPosition(
            this.gameId,
            analyzedCell.position
          );
          if (cell.isAnswered) return;
          this.game.fill(cell.position, analyzedCell.answer!);
        });
      // 解析用ゲームを解放
      this.deleteGameLogic.execute(this.tentativeAnalyzer.successGameId);
    } else {
      BusinessError.throw(
        InfiniteAnalyzeLogic.name,
        this.execute.name,
        '解析できません！'
      );
    }
  }

  // public cancel() {
  //   this.tentativeAnalyzer.cancel;
  // }
}

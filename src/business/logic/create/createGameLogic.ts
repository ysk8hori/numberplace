import GameID from '@/business/valueobject/gameId';
import { inject, autoInjectable } from 'tsyringe';
import CellRepository from '@/business/repository/cellRepository';
import GroupRepository from '@/business/repository/groupRepository';
import GameRepository from '@/business/repository/gameRepository';
import BusinessError from '@/business/businessError';
import InfiniteAnalyzeLogic from '../analyze/infiniteAnalyze/infiniteAnalyzeLogic';
import Utils from '@/utils/utils';
import AnswerLogic from '../analyze/answerLogic';
import Game from '@/business/entity/game';
import Cell from '@/business/entity/cell';
import BaseHeight from '@/business/valueobject/baseHeight';
import BaseWidth from '@/business/valueobject/baseWidth';
import DeleteGameLogic from '../deleteGameLogic';
import AnalyzeTimeoutError from '../analyze/infiniteAnalyze/analyzeTimeoutError';

@autoInjectable()
export default class CreateGameLogic {
  public static create(
    baseHeight: BaseHeight,
    baseWidth: BaseWidth
  ): CreateGameLogic {
    return new CreateGameLogic(baseHeight, baseWidth);
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
  private deleteGameLogic = DeleteGameLogic.create();
  private infiniteAnalyzeLogicForCreate?: InfiniteAnalyzeLogic;
  private infiniteAnalyzeLogicForTweak?: InfiniteAnalyzeLogic;

  /**
   * @throws AnalyzeTimeoutError ... 生成にかかる時間が一定を超えた場合にエラーを投げます。
   */
  public async execute(): Promise<GameID> {
    const answeredGame = this.game.clone();
    do {
      this.infiniteAnalyzeLogicForCreate = InfiniteAnalyzeLogic.create(
        answeredGame.gameId,
        true
      );
      await this.infiniteAnalyzeLogicForCreate.execute();
    } while (
      !this.cellRepository
        .findAll(answeredGame.gameId)
        .every(cell => cell.isAnswered)
    );

    // clonedGameからthis.gameIdのゲームに20数個のセル答えを転写する。
    const shuffledAnsweredCells = Utils.shuffle(
      this.cellRepository.findAll(answeredGame.gameId)
    );
    for (let i = 0; i < this.getBaseAnsweredCellCount(); i++) {
      const cell = shuffledAnsweredCells.pop();
      if (!cell) break;
      AnswerLogic.createAndExecute(
        this.game.gameId,
        cell.position,
        cell.getAnswer()!
      );
    }

    // 解析を行いdifficaltyを見る。1以上だったら難しいのでさらにもう1つ答えを転写して・・・以降ループ。
    let clonedGame: Game;
    console.log('微調整開始');
    do {
      clonedGame = await this.tweak(shuffledAnsweredCells);
      this.deleteGameLogic.execute(clonedGame.gameId);
    } while (clonedGame.difficalty?.value !== 0);
    console.log('微調整完了');

    this.deleteGameLogic.execute(answeredGame.gameId);

    return this.game.gameId;
  }

  private async tweak(shuffledAnsweredCells: Cell[]): Promise<Game> {
    let i = 0;
    console.log(++i);
    let clonedGame: Game;
    console.log(++i);
    const answeredCell = shuffledAnsweredCells.pop();
    console.log(++i);
    AnswerLogic.createAndExecute(
      this.game.gameId,
      answeredCell!.position,
      answeredCell!.getAnswer()!
    );
    console.log(++i);
    clonedGame = this.game.clone();
    console.log(++i);
    this.infiniteAnalyzeLogicForTweak = InfiniteAnalyzeLogic.create(
      clonedGame.gameId,
      true
    );
    console.log(++i);
    await this.infiniteAnalyzeLogicForTweak.execute();
    console.log(++i);
    return clonedGame;
  }

  /** 答えを入力しておくセルの数を取得する。 */
  private getBaseAnsweredCellCount(): number {
    return (this.cellRepository.findAll(this.game.gameId).length / 10) * 3;
  }

  // public cancel() {
  //   this.infiniteAnalyzeLogicForCreate?.cancel();
  //   this.infiniteAnalyzeLogicForTweak?.cancel();
  // }
}

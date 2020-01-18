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

  public execute(): GameID {
    const answeredGame = this.game.clone();
    InfiniteAnalyzeLogic.createAndExecute(answeredGame.gameId, true);

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
    do {
      clonedGame = this.微調整する(shuffledAnsweredCells);
    } while (clonedGame.difficalty?.value !== 0);
    return this.game.gameId;
  }

  private 微調整する(shuffledAnsweredCells: Cell[]): Game {
    let clonedGame: Game;
    const answeredCell = shuffledAnsweredCells.pop();
    AnswerLogic.createAndExecute(
      this.game.gameId,
      answeredCell!.position,
      answeredCell!.getAnswer()!
    );
    clonedGame = this.game.clone();
    InfiniteAnalyzeLogic.createAndExecute(clonedGame.gameId);
    return clonedGame;
  }

  /** 答えを入力しておくセルの数を取得する。 */
  private getBaseAnsweredCellCount(): number {
    return (this.cellRepository.findAll(this.game.gameId).length / 10) * 3;
  }
}

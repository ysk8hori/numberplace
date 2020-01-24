import { autoInjectable, inject } from 'tsyringe';
import GameID from '@/business/valueobject/gameId';
import TentativeDecision from './tentativeDecision';
import CellRepository from '@/business/repository/cellRepository';
import GroupRepository from '@/business/repository/groupRepository';
import GameRepository from '@/business/repository/gameRepository';
import BusinessError from '@/business/businessError';
import InfiniteAnalyzeLogic from './infiniteAnalyzeLogic';
import Game from '@/business/entity/game';
import AnalyzeLogic from '../analyzeLogic';
import Cell from '@/business/entity/cell';
import Utils from '@/utils/utils';
import DeleteGameLogic from '../../deleteGameLogic';
import AnalyzeTimeoutError from './analyzeTimeoutError';
import { Trace } from '@/utils/trace';

/**
 * Gameの解析がAnalizeLogicで完了できない場合に、仮でいずれかのセルに値を入力して解析を進めるためのクラス。
 */
@autoInjectable()
export default class TentativeAnalyzer {
  public static create(
    parrentGameId: GameID,
    create: boolean = false,
    tentativeDecision?: TentativeDecision
  ): TentativeAnalyzer {
    return new TentativeAnalyzer(parrentGameId, create, tentativeDecision);
  }
  public static count = 0;
  constructor(
    private parrentGameId: GameID,
    private isCreate: boolean,
    private tentativeDecision?: TentativeDecision,
    @inject('CellRepository')
    cellRepository?: CellRepository,
    @inject('GroupRepository')
    groupRepository?: GroupRepository,
    @inject('GameRepository')
    gameRepository?: GameRepository
  ) {
    TentativeAnalyzer.count++;
    if (TentativeAnalyzer.count === 300) {
      BusinessError.throw(
        InfiniteAnalyzeLogic.name,
        'constructor',
        '最大カウント数を超えました。'
      );
    }
    if (!cellRepository || !groupRepository || !gameRepository)
      BusinessError.throw(
        InfiniteAnalyzeLogic.name,
        'constructor',
        'リポジトリが指定されていません。'
      );
    this.cellRepository = cellRepository;
    this.gameRepository = gameRepository;
    const parrentGame = gameRepository.find(this.parrentGameId);
    this.myGame = parrentGame.clone();
  }
  private cellRepository: CellRepository;
  private gameRepository: GameRepository;
  private myGame: Game;
  /** 解析に成功した際のGameID */
  private _successGameId?: GameID;
  /**
   * 解析に成功した際のGameID。解析できなかった場合はundefined。
   */
  public get successGameId(): GameID | undefined {
    return this._successGameId;
  }
  // static count: number = 1;
  public async execute() {
    await this.executeAsync();
  }
  private async executeAsync() {
    if (this.tentativeDecision) {
      // 仮入力値とそれを入力するセルが指定されている場合はそれを反映する。
      this.fillFromTentativeDecisioin(this.tentativeDecision);
    }
    // 解析をして残セル数を取得する。残セル数が0なら解析成功。
    if (AnalyzeLogic.create(this.myGame.gameId).execute() === 0) {
      this._successGameId = this.myGame.gameId;
      return;
    }
    try {
      for (const tentativeDecision of this.generateTentativeDecision()) {
        if (TentativeAnalyzer.isCancel) {
          AnalyzeTimeoutError.throw();
        }
        this.myGame.incrementDifficalty(); // 仮で値を決める場合は難易度が上がる。難易度はゲーム作成の際に参照する。
        await this.executeOneTentativeAnalize(tentativeDecision);
        if (this._successGameId) {
          return;
        }
      }
    } catch (e) {
      throw e;
    } finally {
      // メモリ解放
      DeleteGameLogic.create().execute(this.myGame.gameId);
    }
  }
  private tentativeAnalyzer!: TentativeAnalyzer;
  private async executeOneTentativeAnalize(
    tentativeDecision: TentativeDecision
  ) {
    this.tentativeAnalyzer = TentativeAnalyzer.create(
      this.myGame.gameId,
      this.isCreate,
      tentativeDecision
    );
    await this.tentativeAnalyzer.execute();
    if (this.tentativeAnalyzer.successGameId) {
      this._successGameId = this.tentativeAnalyzer.successGameId;
      return;
    }
  }

  private fillFromTentativeDecisioin(tentativeDecision: TentativeDecision) {
    // console.log(
    //   `${tentativeDecision.cellPosition.toString()}に仮で${
    //     tentativeDecision.answer.value
    //   }を入力して${TentativeAnalyzer.count++}回目の解析を行います。`
    // );
    this.myGame.fill(tentativeDecision.cellPosition, tentativeDecision.answer);
  }

  private *generateTentativeDecision(): Generator<TentativeDecision> {
    for (const cell of this.getShuffledMinimumAnswerCountCells()) {
      yield* this.generateTentativeDecisionForOneCell(cell);
    }
  }

  private *generateTentativeDecisionForOneCell(cell: Cell) {
    for (const answerCandidate of this.isCreate
      ? Utils.shuffle(cell.getAnswerCandidateIterator())
      : cell.getAnswerCandidateIterator()) {
      yield new TentativeDecision(cell.position, answerCandidate.toAnswer());
    }
  }
  private getShuffledMinimumAnswerCountCells(): Cell[] {
    return this.isCreate
      ? Utils.shuffle(
          this.cellRepository.getMinimumAnswerCountCells(this.myGame.gameId)
        )
      : this.cellRepository.getMinimumAnswerCountCells(this.myGame.gameId);
  }

  private static isCancel: boolean = false;
  @Trace
  public static cancel() {
    this.isCancel = true;
  }
  public static cancelCancel() {
    this.isCancel = false;
  }
}

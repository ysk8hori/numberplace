import CellPosition from '../valueobject/cellPosition';
import BaseWidth from '@/business/valueobject/baseWidth';
import BaseHeight from '@/business/valueobject/baseHeight';
import Answer from '@/business/valueobject/answer';
import Height from '@/business/valueobject/height';
import Width from '@/business/valueobject/width';
import CellFactory from '@/business/factory/cellFactory';
import CellCollection from '@/business/cellCollection';
import GroupFactory from '@/business/factory/groupFactory';
import GameID from '@/business/valueobject/gameId';
import AnswerLogic from '@/business/logic/analyze/answerLogic';
import GameRepository from '@/business/repository/gameRepository';
import { inject, autoInjectable } from 'tsyringe';
import AnswerCandidateCollection from '@/business/answerCandidateCollection';
import FillOwnAnswerIfLastOneAnswerCandidate from '@/business/logic/analyze/fillOwnAnswerIfLastOneAnswerCandidateLogic';
import FillAllLonelyLogic from '@/business/logic/analyze/fillAllLonelyLogic';
import AnalyzeLogic from '../logic/analyze/analyzeLogic';
import Difficalty from '../valueobject/difficalty';
import { Trace } from '@/utils/trace';

@autoInjectable()
export default class Game {
  public static create(baseHeight: BaseHeight, baseWidth: BaseWidth): Game {
    const game = new Game(baseHeight, baseWidth);
    console.log(`gameID:${game.gameId.value} \n ${new Error().stack}`);
    return game;
  }
  public constructor(
    private _baseHeight: BaseHeight,
    private _baseWidth: BaseWidth,
    @inject('GameRepository')
    gameRepository?: GameRepository
  ) {
    this._height = Height.create(this.baseHeight, this.baseWidth);
    this._width = Width.create(this.baseHeight, this.baseWidth);
    this._gameId = GameID.create();
    this._answerCandidateCollection = AnswerCandidateCollection.create(
      this.baseHeight,
      this.baseWidth
    );
    this.cells = CellFactory.create(
      this.gameId,
      this.baseHeight,
      this.baseWidth,
      this.answerCandidateCollection
    ).createCells();
    GroupFactory.create(
      this.gameId,
      this.baseHeight,
      this.baseWidth
    ).createGroups();
    gameRepository?.regist(this);
  }

  public get baseWidth(): BaseWidth {
    return this._baseWidth;
  }
  public get baseHeight(): BaseHeight {
    return this._baseHeight;
  }

  /** ゲームID */
  private _gameId: GameID;
  /** ゲームID */
  public get gameId(): GameID {
    return this._gameId;
  }
  /** ゲームボードにある全Cell */
  private cells: CellCollection;
  /** ゲームボードの横幅 */
  private _width: Width;
  /** ゲームボードの縦幅 */
  private _height: Height;
  /** 解答候補 */
  private _answerCandidateCollection: AnswerCandidateCollection;
  /** 解答候補（クローン） */
  public get answerCandidateCollection(): AnswerCandidateCollection {
    return this._answerCandidateCollection.clone();
  }
  public difficalty: Difficalty = Difficalty.create();

  /**
   * 解答を記入する。
   * @param position 解答を記入するCellのポジション
   * @param answer 解答
   */
  public fill(position: CellPosition, answer: Answer) {
    AnswerLogic.createAndExecute(this.gameId, position, answer);
    FillOwnAnswerIfLastOneAnswerCandidate.create(this.gameId).execute();
    FillAllLonelyLogic.create(this.gameId).execute();
  }
  public getAnswer(position: CellPosition): Answer | undefined {
    return this.cells.get(position).answer;
  }
  public getAnswerCandidate(position: CellPosition): string[] {
    return this.cells.get(position).getAnswerCandidateStringArray();
  }

  public clone(): Game {
    const clonedGame = Game.create(this.baseHeight, this.baseWidth);
    // 難易度をコピー
    clonedGame.setDifficalty(this.difficalty);
    this.cells.findAll().forEach(cell => {
      if (cell.answer)
        AnswerLogic.createAndExecute(
          clonedGame.gameId,
          cell.position,
          cell.answer
        );
    });
    AnalyzeLogic.create(clonedGame.gameId).execute();
    return clonedGame;
  }

  public incrementDifficalty(): Game {
    this.difficalty.increment();
    return this;
  }
  public setDifficalty(difficalty: Difficalty) {
    this.difficalty = Difficalty.create(difficalty.value);
  }
}

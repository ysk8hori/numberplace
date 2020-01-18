import Game from '@/business/entity/game';
import BaseHeight from '@/business/valueobject/baseHeight';
import BaseWidth from '@/business/valueobject/baseWidth';
import LoadLogic from '@/business/logic/loadLogic';
import AnalyzeLogic from '@/business/logic/analyze/analyzeLogic';
import { inject, autoInjectable, injectable } from 'tsyringe';
import CellRepository from '@/business/repository/cellRepository';
import Cell from '@/business/entity/cell';
import InfiniteAnalyzeLogic from '@/business/logic/analyze/infiniteAnalyze/infiniteAnalyzeLogic';
import OutputAnswerStringLogic from '@/business/logic/outputAnswerStringLogic';

@autoInjectable()
export default class TestDefiner {
  /**
   * issue、answers共に、カラムの区切り文字なし、行の区切りを'|'として渡すこと。
   * @param issue 問題
   * @param answers 答え
   */
  public static create(
    issue: string,
    answers: string,
    baseHeight: number = 3,
    baseWidth: number = 3
  ): TestDefiner {
    return new TestDefiner(issue, answers)
      .setBaseHeight(BaseHeight.create(baseHeight))
      .setBaseWidth(BaseWidth.create(baseWidth))
      .initialize();
  }

  public constructor(
    private issue: string,
    private answers: string,
    @inject('CellRepository')
    private cellRepository?: CellRepository
  ) {}

  public initialize(): TestDefiner {
    this.game = Game.create(this.baseHeight, this.baseWidth);
    this.answeredGame = Game.create(this.baseHeight, this.baseWidth);
    return this;
  }

  private baseHeight: BaseHeight = BaseHeight.create(3);
  public setBaseHeight(baseHeight: BaseHeight): TestDefiner {
    this.baseHeight = baseHeight;
    return this;
  }
  private baseWidth: BaseWidth = BaseWidth.create(3);
  public setBaseWidth(baseWidth: BaseWidth): TestDefiner {
    this.baseWidth = baseWidth;
    return this;
  }
  private game!: Game;
  private remainingCount: number = -1;
  private answeredGame!: Game;

  public defineBeforeAll() {
    beforeAll(() => {
      const colSplitter =
        10 <= this.baseHeight.value * this.baseWidth.value ? ',' : '';
      LoadLogic.create(this.game.gameId).execute(this.issue, {
        rowSplitter: '|',
        colSplitter
      });
      InfiniteAnalyzeLogic.createAndExecute(this.game.gameId);
      console.log(
        OutputAnswerStringLogic.create(this.game.gameId).getAnswerString()
      );
      LoadLogic.create(this.answeredGame.gameId).execute(this.answers, {
        rowSplitter: '|',
        colSplitter
      });
    });
  }
  public defineTests() {
    // test('残件が0であること', () => {
    //   expect(this.remainingCount).toBe(0);
    // });
    this.cellRepository
      ?.findAll(this.answeredGame.gameId)
      .forEach(answeredCell => this.defineOneTest(answeredCell));
  }

  private defineOneTest(answeredCell: Cell) {
    test(`${answeredCell.position.toString()}が${
      answeredCell.getAnswer()?.value
    }であること`, () => {
      expect(
        this.cellRepository
          ?.findByPosition(this.game.gameId, answeredCell.position)
          .getAnswer()?.value
      ).toEqual(answeredCell.getAnswer()?.value);
    });
  }
}

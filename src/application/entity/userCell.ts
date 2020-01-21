import CellPosition from '@/business/valueobject/cellPosition';
import Answer from '@/business/valueobject/answer';
import Cell from '@/business/entity/cell';

/**
 * ゲームにおける、ユーザーが操作可能なセル
 */
export default class UserCell {
  public static create(cell: Cell): UserCell {
    return new UserCell(cell.position, cell.getAnswer());
  }
  /**
   * コンストラクタ。
   * @deprecated
   */
  public constructor(
    public readonly position: CellPosition,
    private _answer?: Answer
  ) {}

  /**
   * 解答済みのCellであるかどうかを判定する。
   */
  public get isAnswered(): boolean {
    return !!this._answer;
  }

  public get answer(): Answer | undefined {
    return this._answer;
  }

  public setAnswer(answer: Answer): UserCell {
    this._answer = answer;
    return this;
  }
}

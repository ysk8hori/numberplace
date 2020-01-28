import CellPosition from '@/business/valueobject/cellPosition';
import Answer from '@/business/valueobject/answer';
import Cell from '@/business/entity/cell';
import GameID from '@/business/valueobject/gameId';

/**
 * ゲームにおける、ユーザーが操作可能なセル
 */
export default class UserCell {
  public static create(gameId: GameID, cell: Cell): UserCell {
    return new UserCell(gameId, cell.position, cell.getAnswer());
  }

  /**
   * コンストラクタ。
   * @deprecated
   */
  private constructor(
    public readonly gameId: GameID,
    public readonly position: CellPosition,
    private _answer?: Answer
  ) {}

  private _unselect?: () => void;
  public setUnselectCallback(unselect: () => void) {
    this._unselect = unselect;
  }
  public unselect() {
    if (this._unselect) this._unselect();
  }

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

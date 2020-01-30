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

  /** セレクト解除時のコールバック */
  private _unselect?: () => void;
  /** セレクト解除時のコールバック関数を設定する */
  public setUnselectCallback(unselect: () => void) {
    this._unselect = unselect;
  }
  /** セレクト状態を解除する */
  public unselect() {
    this._isSelected = false;
    if (this._unselect) this._unselect();
  }
  /** セレクト状態であるかどうか */
  public _isSelected = false;
  /** セレクト状態であるかどうか */
  public get isSelected(): boolean {
    return this._isSelected;
  }

  /** セレクト時のコールバック */
  private _select?: () => void;
  /** セレクト時のコールバック関数を設定する */
  public setSelectCallback(select: () => void) {
    this._select = select;
  }
  /** セレクト状態にする */
  public select() {
    this._isSelected = true;
    if (this._select) this._select();
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

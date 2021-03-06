import CellPosition from '@/core/valueobject/cellPosition';
import Answer from '@/core/valueobject/answer';
import Cell from '@/core/entity/cell';
import GameID from '@/core/valueobject/gameId';
import CellStyle from '../valueObject/cellStyle';

/**
 * ゲームにおける、ユーザーが操作可能なセル
 */
export default class UserCell {
  public static create(
    gameId: GameID,
    cell: Cell,
    cellSize: CellStyle
  ): UserCell {
    return new UserCell(gameId, cell.position, cellSize, cell.getAnswer());
  }

  /**
   * コンストラクタ。
   * @deprecated
   */
  private constructor(
    public readonly gameId: GameID,
    public readonly position: CellPosition,
    public readonly cellSize: CellStyle,
    private _answer?: Answer
  ) {
    this._isChangeable = !_answer;
  }

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

  private _isChangeable = true;
  public get isChangeable(): boolean {
    return this._isChangeable;
  }

  /**
   * 解答済みのCellであるかどうかを判定する。
   */
  public get isAnswered(): boolean {
    return this._answer !== undefined && this._answer.value !== '';
  }

  public get answer(): Answer | undefined {
    return this._answer;
  }

  private fill?: (answer: Answer) => void;
  public setFillCallback(fill: (answer: Answer) => void) {
    this.fill = fill;
  }
  public setAnswer(answer: Answer): UserCell {
    if (!this.isChangeable) return this;
    this._answer = answer;
    if (this.fill) this.fill(answer);
    return this;
  }
}

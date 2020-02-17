import GameSize from '../entity/gameSize';
import WindowHeight from './windowHeight';
import WindowWidth from './windowWidth';

/** Cellのスタイルを定義するクラス。主にDisplaySizeによって動的に変化するスタイルを作る。 */
export default class CellStyle {
  /**
   * セルのサイズを算出する際に考慮すべきWindowの高さの調整値。
   * ヘッダー、フッター、コントローラを考慮した値を差し引いている。
   */
  private static readonly ADJUSTMENT_HEIGHT = 230;

  public static create(
    gameSize: GameSize,
    windowHeight: WindowHeight,
    windowWidth: WindowWidth
  ): CellStyle {
    const baseSize = Math.min(
      windowHeight.value - CellStyle.ADJUSTMENT_HEIGHT,
      windowWidth.value
    );
    return new CellStyle(gameSize, baseSize);
  }
  private constructor(private gameSize: GameSize, private baseSize: number) {}
  public getStyle(): any {
    return {
      // width: this.getWidth(),
      height: this.getHeight(),
      fontSize: this.getAnswerFontSize()
    };
  }

  private getWidth(): string {
    return `${this.baseSize / (this.gameSize.size + 1)}px`;
  }

  private getHeight(): string {
    return `${this.baseSize / (this.gameSize.size + 1)}px`;
  }

  private getAnswerFontSize(): string {
    return `${(this.baseSize / (this.gameSize.size + 3)) * 0.8}px`;
  }
}

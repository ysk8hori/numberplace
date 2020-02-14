import GameSize from '../entity/gameSize';
import WindowHeight from './windowHeight';
import WindowWidth from './windowWidth';

/** Cellのスタイルを定義するクラス。主にDisplaySizeによって動的に変化するスタイルを作る。 */
export default class CellStyle {
  public static create(
    gameSize: GameSize,
    windowHeight: WindowHeight,
    windowWidth: WindowWidth
  ): CellStyle {
    const baseSize = Math.min(windowHeight.value, windowWidth.value);
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

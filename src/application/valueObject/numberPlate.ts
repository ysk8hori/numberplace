import Utils from '@/utils/utils';
import GameSize from '@/core/entity/gameSize';

/**
 * コントローラーのうち番号を入力するプレートとして描画する扇型の図形の描画に使用する値の計算と提供を行う。
 */
export default class NumberPlate {
  public static create(index: number, buttonCount: number): NumberPlate {
    // 2段に分ける
    const row = index < buttonCount / 2 ? 0 : 1;
    const r = 200 * (row === 0 ? 1 : 3 / 4); // このボタンの半径
    const colCount = row === 0 ? index : index - Math.ceil(buttonCount / 2); // このボタンの段におけるカラム
    const rangeDegree =
      90 /
      (row === 0
        ? Math.ceil(buttonCount / 2)
        : buttonCount - Math.ceil(buttonCount / 2));
    const startDegree = rangeDegree * colCount + 180;
    const endDegree = rangeDegree * colCount + rangeDegree + 180;
    return new NumberPlate(
      100,
      100,
      r,
      r,
      Utils.degreeToRadian(startDegree),
      Utils.degreeToRadian(endDegree),
      0,
      (++index).toString(10),
      index
    );
  }
  public static createList(gameSize: GameSize): NumberPlate[] {
    return Utils.createArray(gameSize.size).map(index =>
      this.create(index, gameSize.size)
    );
  }
  /**
   *
   * @param cx 円の中心x座標
   * @param cy 円の中心y座標
   * @param rx x軸半径
   * @param ry y軸半径
   * @param startAngle 描画開始角度
   * @param endAngle 描画終了角度
   * @param tilt 傾き(度)
   * @param answer この画像を押下した際に入力する答え
   */
  constructor(
    private cx: number,
    private cy: number,
    private rx: number,
    private ry: number,
    private startAngle: number,
    private endAngle: number,
    private tilt: number,
    public readonly answer: string,
    public key: number
  ) {}

  /**
   * ```d="M x1 y1  a  rx ry start f1 f2 dx,dy"```
   */
  public get d(): string {
    let d = `M ${this.cx},${this.cy} L ${this.x1},${this.y1} A ${this.rx} ${this.ry} ${this.tilt} ${this.f1} ${this.f2} ${this.x2},${this.y2}z`;
    return d;
  }
  /** 円弧始点: (x1, y1) */
  private get x1(): number {
    return this.cx + this.rx * Math.cos(this.startAngle);
  }
  /** 円弧始点: (x1, y1) */
  private get y1(): number {
    return this.cy + this.ry * Math.sin(this.startAngle);
  }
  /** 円弧終点: (x2, y2) */
  private get x2(): number {
    return this.cx + this.rx * Math.cos(this.endAngle);
  }
  /** 円弧終点: (x2, y2) */
  private get y2(): number {
    return this.cy + this.ry * Math.sin(this.endAngle);
  }
  /** dx = x2 - x1 */
  private get dx(): number {
    return this.x2 - this.x1;
  }
  /** dy = y2 - y1 */
  private get dy(): number {
    return this.y2 - this.y1;
  }
  /** 0の時180度以内の円弧、1の時180度以上の円弧 */
  private f1 = 0; // todo:動的にかえる
  /** 0の時反時計回り 1の時時計回り */
  private f2 = 1;

  public readonly fill: string = 'white';
  public readonly stroke: string = '#aad6ec';

  public get charaPositionX(): number {
    return (this.x1 + this.x2) / 2 + 10;
  }
  public get charaPositionY(): number {
    return (this.y1 + this.y2) / 2 + 10;
  }
}

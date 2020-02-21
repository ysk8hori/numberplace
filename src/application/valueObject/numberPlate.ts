import Utils from '@/utils/utils';

/**
 * コントローラーのうち番号を入力するプレートとして描画する扇型の図形の描画に使用する値の計算と提供を行う。
 */
export default class NumberPlate {
  private static create(
    startDegree: number,
    endDegree: number,
    answer: string
  ): NumberPlate {
    return new NumberPlate(
      100,
      100,
      200,
      200,
      Utils.degreeToRadian(startDegree),
      Utils.degreeToRadian(endDegree),
      0,
      answer
    );
  }
  public static createList(buttonCount: number): NumberPlate[] {
    let degree = 180;
    return Utils.createArray(buttonCount).map(index =>
      this.create(degree, (degree += 90 / buttonCount), (++index).toString(10))
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
   */
  constructor(
    private cx: number,
    private cy: number,
    private rx: number,
    private ry: number,
    private startAngle: number,
    private endAngle: number,
    private tilt: number,
    public readonly answer: string
  ) {}

  /**
   * ```d="M x1 y1  a  rx ry start f1 f2 dx,dy"```
   */
  public get d(): string {
    let d = `M ${this.cx},${this.cy} L ${this.x1},${this.y1} A ${this.rx} ${this.ry} ${this.tilt} ${this.f1} ${this.f2} ${this.x2},${this.y2}z`;
    // d = `M 0,0 L ${this.x1},${this.y1}z`;
    console.log(d);
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

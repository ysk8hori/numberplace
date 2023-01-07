export class Result<T extends string, T2 = undefined> {
  public static create<T extends string>(status: T): Result<T, undefined>;
  public static create<T extends string, T2 = undefined>(
    status: T,
    data: T2,
  ): Result<T, T2>;
  public static create<T extends string, T2 = undefined>(status: T, data?: T2) {
    return new Result(status, data);
  }
  private constructor(status: T, data: T2) {
    this.status = status;
    this.data = data;
  }
  public status: T;
  public data: T2;
}

export class Result<T extends string, T2 = undefined> {
  public static create<T extends string>(status: T): Result<T, undefined>;
  public static create<T extends string, T2 = undefined>(
    status: T,
    data: T2,
  ): Result<T, T2>;
  public static create<T extends string, T2 = undefined>(status: T, data?: T2) {
    return new Result(status, data);
  }
  private constructor(public readonly status: T, public readonly data: T2) {}
}

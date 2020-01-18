export default class GameID {
  public static readonly uuid = require('uuid/v4');
  private constructor(private value: string) {}
  public static create(): GameID {
    return new GameID(this.uuid());
  }
  public equals(other: GameID): boolean {
    return this.value === other.value;
  }
}

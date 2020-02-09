import GameID from '@/core/valueobject/gameId';

export default interface GameIdRepository {
  setCurrentGameId(gameId: GameID | undefined): void;
  getCurrentGameId(): GameID | undefined;
}

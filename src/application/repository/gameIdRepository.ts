import GameID from '@/business/valueobject/gameId';

export default interface GameIdRepository {
  setCurrentGameId(gameId: GameID | undefined): void;
  getCurrentGameId(): GameID | undefined;
}

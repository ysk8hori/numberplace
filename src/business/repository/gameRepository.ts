import GameID from '@/business/valueobject/gameId';
import Game from '@/business/entity/game';

export default interface GameRepository {
  regist(game: Game): void;
  find(gameId: GameID): Game;
}

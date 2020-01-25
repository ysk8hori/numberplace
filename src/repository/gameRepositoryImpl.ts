import GameRepository from '@/business/repository/gameRepository';
import { injectable } from 'tsyringe';
import GameID from '@/business/valueobject/gameId';
import Game from '@/business/entity/game';
import BusinessError from '@/business/businessError';
import GroupRepositoryImpl from './groupRepositoryImpl';

@injectable()
export default class GameRepositoryImpl implements GameRepository {
  public static create(): GameRepository {
    return new GameRepositoryImpl();
  }
  public static games: Game[] = [];
  public regist(game: Game): void {
    GameRepositoryImpl.games.push(game);
  }
  public find(gameId: GameID): Game {
    return (
      GameRepositoryImpl.games.find(game => game.gameId.equals(gameId)) ??
      BusinessError.throw(
        GameRepositoryImpl.name,
        this.find.name,
        '指定したGameは見つかりません。'
      )
    );
  }
  public remove(gameId: GameID): void {
    GameRepositoryImpl.games = GameRepositoryImpl.games.filter(
      game => !game.gameId.equals(gameId)
    );
  }
}

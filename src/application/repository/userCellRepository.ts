import CellPosition from '@/business/valueobject/cellPosition';
import UserCell from '../entity/userCell';
import GameID from '@/business/valueobject/gameId';

export default interface UserCellRepository {
  push(gameId: GameID, userCell: UserCell): void;
  findByPosition(gameId: GameID, position: CellPosition): UserCell;
  clear(gameId: GameID): void;
}

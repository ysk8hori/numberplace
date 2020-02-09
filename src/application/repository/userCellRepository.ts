import CellPosition from '@/core/valueobject/cellPosition';
import UserCell from '../entity/userCell';
import GameID from '@/core/valueobject/gameId';

export default interface UserCellRepository {
  push(gameId: GameID, userCell: UserCell): void;
  findAll(gameId: GameID): UserCell[];
  findByPosition(gameId: GameID, position: CellPosition): UserCell;
  findSelectedCell(gameId: GameID): UserCell | undefined;
  clear(gameId: GameID): void;
}

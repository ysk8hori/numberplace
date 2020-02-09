import CellPosition from '@/business/valueobject/cellPosition';
import UserCell from '../entity/userCell';
import GameID from '@/business/valueobject/gameId';

export default interface UserCellRepository {
  push(gameId: GameID, userCell: UserCell): void;
  findAll(gameId: GameID): UserCell[];
  findByPosition(gameId: GameID, position: CellPosition): UserCell;
  findSelectedCell(gameId: GameID): UserCell | undefined;
  clear(gameId: GameID): void;
}

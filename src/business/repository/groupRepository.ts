import Group, { GroupType } from '@/business/entity/group';
import GroupID from '@/business/valueobject/groupId';
import GameID from '@/business/valueobject/gameId';
import VerticalPosition from '@/business/valueobject/verticalPosition';
import HorizontalPosition from '@/business/valueobject/horizontalPosition';

export default interface GroupRepository {
  regist(gameId: GameID, groups: Group[]): void;
  findAll(gameId: GameID): Group[];
  find(gameId: GameID, groupID: GroupID): Group;
  findByType(gameId: GameID, groupType: GroupType): Group[];
  findHorizontalGroupByVerticalPosition(
    gameId: GameID,
    verticalPosition: VerticalPosition
  ): Group;
  findVerticalGroupByHorizontalPosition(
    gameId: GameID,
    horizontalPosition: HorizontalPosition
  ): Group;
  remove(gameId: GameID): void;
}

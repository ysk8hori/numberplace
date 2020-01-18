import GroupID from '@/business/valueobject/groupId';
import GameID from '@/business/valueobject/gameId';

describe('GroupID', () => {
  const gameA = GameID.create();
  const groupA = GroupID.create(gameA, 'v0');
  const groupA_ = GroupID.create(gameA, 'v0');
  it('isSameGroupIDs', () => {
    expect(GroupID.create(gameA, 'v0')).toEqual(GroupID.create(gameA, 'v0'));
  });
});

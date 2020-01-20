import GameID from '@/business/valueobject/gameId';
import Game from '@/business/entity/game';
import BaseHeight from '@/business/valueobject/baseHeight';
import BaseWidth from '@/business/valueobject/baseWidth';
import GetGridOfSquareGroupsLogic from '@/business/logic/play/getGridOfSquareGroupsLogic';

describe('GetGridOfSquareGroupsLogic', () => {
  describe('3, 3', () => {
    let game: Game;
    let getGridOfSquareGroupsLogic: GetGridOfSquareGroupsLogic;
    beforeAll(() => {
      game = Game.create(BaseHeight.create(3), BaseWidth.create(3));
      getGridOfSquareGroupsLogic = GetGridOfSquareGroupsLogic.create(
        game.gameId
      );
      getGridOfSquareGroupsLogic.execute();
    });
    test('getGridOfSquareGroupsLogic.execute()でグリッドが取得できること', () => {
      expect(getGridOfSquareGroupsLogic.execute()).toBeDefined();
    });
    test('getGridOfSquareGroupsLogic.grid()でグリッドが取得できること', () => {
      expect(getGridOfSquareGroupsLogic.grid).toBeDefined();
    });
    test.each`
      row  | col  | groupId
      ${0} | ${0} | ${'s0'}
      ${0} | ${1} | ${'s1'}
      ${0} | ${2} | ${'s2'}
      ${1} | ${0} | ${'s3'}
      ${1} | ${1} | ${'s4'}
      ${1} | ${2} | ${'s5'}
      ${2} | ${0} | ${'s6'}
      ${2} | ${1} | ${'s7'}
      ${2} | ${2} | ${'s8'}
    `(
      'gridの[$row][$col]のグループIDが$groupIdであること',
      ({ row, col, groupId }) => {
        expect(
          getGridOfSquareGroupsLogic.grid![row][col].groupId.idString
        ).toEqual(groupId);
      }
    );
  });
  describe('2x3', () => {
    let game: Game;
    let getGridOfSquareGroupsLogic: GetGridOfSquareGroupsLogic;
    beforeAll(() => {
      game = Game.create(BaseHeight.create(2), BaseWidth.create(3));
      getGridOfSquareGroupsLogic = GetGridOfSquareGroupsLogic.create(
        game.gameId
      );
      getGridOfSquareGroupsLogic.execute();
    });
    test('getGridOfSquareGroupsLogic.execute()でグリッドが取得できること', () => {
      expect(getGridOfSquareGroupsLogic.execute()).toBeDefined();
    });
    test('getGridOfSquareGroupsLogic.grid()でグリッドが取得できること', () => {
      expect(getGridOfSquareGroupsLogic.grid).toBeDefined();
    });
    test.each`
      row  | col  | groupId
      ${0} | ${0} | ${'s0'}
      ${0} | ${1} | ${'s1'}
      ${1} | ${0} | ${'s2'}
      ${1} | ${1} | ${'s3'}
      ${2} | ${0} | ${'s4'}
      ${2} | ${1} | ${'s5'}
    `(
      'gridの[$row][$col]のグループIDが$groupIdであること',
      ({ row, col, groupId }) => {
        expect(
          getGridOfSquareGroupsLogic.grid![row][col].groupId.idString
        ).toEqual(groupId);
      }
    );
  });
});

import CreateGoodGameLogic from '@/core/logic/create/createGoodGameLogic';
import UpdateCurrentGameIdLogic from '@/application/logic/updateCurrentGameIdLogic';
import CreateUserCellLogic from '@/application/logic/createUserCellLogic';
import WindowHeight from '@/application/valueObject/windowHeight';
import WindowWidth from '@/application/valueObject/windowWidth';
import BaseHeight from '@/core/valueobject/baseHeight';
import BaseWidth from '@/core/valueobject/baseWidth';
import GameSize from '@/core/entity/gameSize';
import SelectCellLogic from '@/application/logic/selectCellLogic';
import { pos } from '@/core/valueobject/cellPosition';
import MouseEventForControllingGame from '@/application/event/mouseEventForControllingGame';
import UserCellRepositoryImpl from '@/repository/userCellRepositoryImpl';
import { container } from 'tsyringe';
import UserCellRepository from '@/application/repository/userCellRepository';

describe('mouseEventForControllingGame', () => {
  const baseHeight = BaseHeight.create(3);
  const baseWidth = BaseWidth.create(3);
  const gameId = CreateGoodGameLogic.create(baseHeight, baseWidth).execute();
  UpdateCurrentGameIdLogic.create(gameId).execute();
  CreateUserCellLogic.createAndExecute(
    gameId,
    GameSize.create(baseHeight.value, baseWidth.value) as GameSize,
    WindowHeight.create(window.innerHeight),
    WindowWidth.create(window.innerWidth)
  );
  describe('(0,0)から右へ9px、下へ9px移動する', () => {
    beforeAll(() => {
      SelectCellLogic.create(gameId, pos(0, 0));
      const event = MouseEventForControllingGame.create(gameId);
      event.moveStarted(300, 300);
      event.moving(309, 309);
    });
    test('選択セルのverticalPositionが0であること', () => {
      expect(
        (container.resolve(
          'UserCellRepository'
        ) as UserCellRepository).findSelectedCell(gameId)?.position
          .verticalPosition.value
      ).toBe(0);
    });
    test('選択セルのhorizontalPositionが0であること', () => {
      expect(
        (container.resolve(
          'UserCellRepository'
        ) as UserCellRepository).findSelectedCell(gameId)?.position
          .horizontalPosition.value
      ).toBe(0);
    });
  });
  // describe('(2,2)から右へ10px、下へ10px移動する', () => {
  //   beforeAll(() => {
  //     SelectCellLogic.create(gameId, pos(2, 2));
  //     const event = MouseEventForControllingGame.create(gameId);
  //     event.moveStarted(300, 300);
  //     event.moving(310, 310);
  //   });
  //   test('選択セルのverticalPositionが3であること', () => {
  //     expect(
  //       (container.resolve(
  //         'UserCellRepository'
  //       ) as UserCellRepository).findSelectedCell(gameId)?.position
  //         .verticalPosition.value
  //     ).toBe(3);
  //   });
  //   test('選択セルのhorizontalPositionが3であること', () => {
  //     expect(
  //       (container.resolve(
  //         'UserCellRepository'
  //       ) as UserCellRepository).findSelectedCell(gameId)?.position
  //         .horizontalPosition.value
  //     ).toBe(3);
  //   });
  // });
});

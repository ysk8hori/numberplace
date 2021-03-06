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
  const THRESHOLD = MouseEventForControllingGame.PIXEL_REQUIRED_TO_MOVE_ONE;
  describe.each`
    startingVPos | startingHPos | startingTouchPos      | movingVPos              | movingHPos              | resultVPos | resultHPos
    ${undefined} | ${undefined} | ${{ x: 300, y: 300 }} | ${THRESHOLD}            | ${THRESHOLD}            | ${1}       | ${1}
    ${undefined} | ${undefined} | ${{ x: 300, y: 300 }} | ${THRESHOLD * 10}       | ${THRESHOLD * -10}      | ${8}       | ${0}
    ${0}         | ${0}         | ${{ x: 300, y: 300 }} | ${THRESHOLD - 0.01}     | ${THRESHOLD - 1}        | ${0}       | ${0}
    ${2}         | ${2}         | ${{ x: 310, y: 300 }} | ${THRESHOLD}            | ${THRESHOLD}            | ${3}       | ${3}
    ${0}         | ${0}         | ${{ x: 123, y: 321 }} | ${THRESHOLD * 9 - 1}    | ${THRESHOLD * 9 - 1}    | ${8}       | ${8}
    ${6}         | ${8}         | ${{ x: 300, y: 400 }} | ${(THRESHOLD - 1) * -1} | ${(THRESHOLD - 1) * -1} | ${6}       | ${8}
    ${7}         | ${4}         | ${{ x: 100, y: 300 }} | ${THRESHOLD * -1}       | ${THRESHOLD * -1}       | ${6}       | ${3}
    ${0}         | ${0}         | ${{ x: 999, y: 543 }} | ${THRESHOLD * 9}        | ${0}                    | ${8}       | ${0}
    ${0}         | ${0}         | ${{ x: 999, y: 543 }} | ${0}                    | ${THRESHOLD * 9}        | ${0}       | ${8}
    ${0}         | ${0}         | ${{ x: 999, y: 543 }} | ${THRESHOLD * -10}      | ${THRESHOLD - 10}       | ${0}       | ${0}
    ${0}         | ${0}         | ${{ x: 999, y: 543 }} | ${THRESHOLD * 10}       | ${THRESHOLD * -10}      | ${8}       | ${0}
    ${0}         | ${0}         | ${{ x: 999, y: 543 }} | ${THRESHOLD * -10}      | ${THRESHOLD * 10}       | ${0}       | ${8}
  `(
    '($startingVPos, $startingHPos)から縦方向へ$movingVPos px、横方向へ$movingHPos px移動する',
    ({
      startingVPos,
      startingHPos,
      startingTouchPos,
      movingVPos,
      movingHPos,
      resultVPos,
      resultHPos
    }) => {
      beforeAll(() => {
        if (startingVPos !== undefined) {
          SelectCellLogic.create(
            gameId,
            pos(startingVPos, startingHPos)
          ).execute();
        }
        const event = MouseEventForControllingGame.create(gameId);
        event.moveStarted(startingTouchPos.x, startingTouchPos.y);
        event.moving(
          startingTouchPos.x + movingHPos,
          startingTouchPos.y + movingVPos
        );
      });
      test(`選択セルのverticalPositionが${resultVPos}であること`, () => {
        expect(
          (container.resolve(
            'UserCellRepository'
          ) as UserCellRepository).findSelectedCell(gameId)?.position
            .verticalPosition.value
        ).toBe(resultVPos);
      });
      test(`選択セルのhorizontalPositionが${resultHPos}であること`, () => {
        expect(
          (container.resolve(
            'UserCellRepository'
          ) as UserCellRepository).findSelectedCell(gameId)?.position
            .horizontalPosition.value
        ).toBe(resultHPos);
      });
    }
  );
});

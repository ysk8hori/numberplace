import { Vue, Component } from 'vue-property-decorator';
import AppVm from '@/app.vm';
import HomeRoute from '@/router/config/homeRoute';
import CreateGoodGameLogic from '@/core/logic/create/createGoodGameLogic';
import GameID from '@/core/valueobject/gameId';
import Group from '@/core/entity/group';
import GetGridOfSquareGroupsLogic from '@/application/logic/getGridOfSquareGroupsLogic';
import GameBoard from './GameBoard.vue';
import NumberPlaceController from './NumberPlaceController.vue';
import CreateUserCellLogic from '@/application/logic/createUserCellLogic';
import UserAnswerLogic from '@/application/logic/userAnswerLogic';
import Answer from '@/core/valueobject/answer';
import UpdateCurrentGameIdLogic from '@/application/logic/updateCurrentGameIdLogic';
import WindowHeight from '@/application/valueObject/windowHeight';
import WindowWidth from '@/application/valueObject/windowWidth';
import MouseEventForControllingGame from '@/application/event/mouseEventForControllingGame';

@Component({ components: { GameBoard, NumberPlaceController } })
export default class PlayingVm extends Vue {
  private gameId: GameID | undefined;
  protected groupGrid: Group[][] = [[]];
  protected oops: boolean = false;
  protected cleared: boolean = false;
  public created() {
    const gameSize = (this.$parent as AppVm).playingGameSize;
    if (!gameSize) return this.$router.push(HomeRoute.NAME);
    this.gameId = CreateGoodGameLogic.create(
      gameSize!.baseHeight,
      gameSize!.baseWidth
    ).execute();
    UpdateCurrentGameIdLogic.create(this.gameId).execute();
    CreateUserCellLogic.createAndExecute(
      this.gameId,
      gameSize,
      WindowHeight.create(window.innerHeight),
      WindowWidth.create(window.innerWidth)
    );
    this.groupGrid = GetGridOfSquareGroupsLogic.create(this.gameId).execute();
    UserAnswerLogic.setClearCallback(this.gameCleared);
    UserAnswerLogic.setFailureCallback(this.gameFailured);
  }
  protected gameCleared() {
    this.cleared = true;
  }
  protected gameFailured() {
    this.oops = true;
  }
  protected toTop() {
    this.$router.push('/');
  }

  private mouseEventForControllingGame:
    | MouseEventForControllingGame
    | undefined;

  protected touchstart(event: TouchEvent) {
    if (!this.gameId) return;
    this.mouseEventForControllingGame = MouseEventForControllingGame.create(
      this.gameId
    );
    this.mouseEventForControllingGame.moveStarted(
      event.targetTouches[0].clientX,
      event.targetTouches[0].clientY
    );
  }

  protected touchmove(event: TouchEvent) {
    this.mouseEventForControllingGame?.moving(
      event.targetTouches[0].clientX,
      event.targetTouches[0].clientY
    );
  }

  protected stop(event: TouchEvent) {
    this.mouseEventForControllingGame = undefined;
  }
}

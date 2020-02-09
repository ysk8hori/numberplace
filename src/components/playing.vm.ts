import { Vue, Prop, Component } from 'vue-property-decorator';
import Game from '@/business/entity/game';
import AppVm from '@/app.vm';
import HomeRoute from '@/router/config/homeRoute';
import CreateGoodGameLogic from '@/business/logic/create/createGoodGameLogic';
import GameID from '@/business/valueobject/gameId';
import OutputAnswerStringLogic from '@/business/logic/outputAnswerStringLogic';
import Group from '@/business/entity/group';
import GetGridOfSquareGroupsLogic from '@/application/logic/getGridOfSquareGroupsLogic';
import SquareGroupVm from './squareGroup.vm';
import SquareGroup from './SquareGroup.vue';
import CreateGameLogic from '@/business/logic/create/createGameLogic';
import CreateUserCellLogic from '@/application/logic/createUserCellLogic';
import UserAnswerLogic from '@/application/logic/userAnswerLogic';
import Answer from '@/business/valueobject/answer';
import { Trace } from '@/utils/trace';
import UpdateCurrentGameIdLogic from '@/application/logic/updateCurrentGameIdLogic';
import WindowHeight from '@/application/valueObject/windowHeight';
import WindowWidth from '@/application/valueObject/windowWidth';

/** TodoList.vueに対するViewModel */
@Component({ components: { SquareGroup } })
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

  protected fill(answer: number) {
    UserAnswerLogic.create(this.gameId!, Answer.create(answer)).execute();
  }

  protected gameCleared() {
    this.cleared = true;
  }
  protected gameFailured() {
    this.oops = true;
  }
}

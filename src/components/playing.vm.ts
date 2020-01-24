import { Vue, Prop, Component } from 'vue-property-decorator';
import Game from '@/business/entity/game';
import AppVm from '@/app.vm';
import HomeRoute from '@/router/config/homeRoute';
import CreateGoodGameLogic from '@/business/logic/create/createGoodGameLogic';
import GameID from '@/business/valueobject/gameId';
import OutputAnswerStringLogic from '@/business/logic/outputAnswerStringLogic';
import Group from '@/business/entity/group';
import GetGridOfSquareGroupsLogic from '@/business/logic/play/getGridOfSquareGroupsLogic';
import SquareGroupVm from './squareGroup.vm';
import SquareGroup from './SquareGroup.vue';
import CreateGameLogic from '@/business/logic/create/createGameLogic';
import CreateUserCellLogic from '@/application/logic/createUserCellLogic';

/** TodoList.vueに対するViewModel */
@Component({ components: { SquareGroup } })
export default class PlayingVm extends Vue {
  protected message = 'PLAY';
  private gameId: GameID | undefined;
  protected groupGrid: Group[][] = [[]];

  public async created() {
    const gameSize = (this.$parent as AppVm).playingGameSize;
    if (!gameSize) return this.$router.push(HomeRoute.NAME);
    this.gameId = await CreateGoodGameLogic.create(
      gameSize!.baseHeight,
      gameSize!.baseWidth
    ).execute();
    CreateUserCellLogic.createAndExecute(this.gameId);
    this.groupGrid = GetGridOfSquareGroupsLogic.create(this.gameId).execute();
  }
}

import { Vue, Prop, Component } from 'vue-property-decorator';
import Game from '@/business/entity/game';
import AppVm from '@/app.vm';
import HomeRoute from '@/router/config/homeRoute';
import CreateGoodGameLogic from '@/business/logic/create/createGoodGameLogic';
import GameID from '@/business/valueobject/gameId';
import OutputAnswerStringLogic from '@/business/logic/outputAnswerStringLogic';

/** TodoList.vueに対するViewModel */
@Component({})
export default class PlayingVm extends Vue {
  protected message = 'PLAY';
  private gameId: GameID | undefined;
  protected gameString: string = '';

  public mounted() {
    const gameSize = (this.$parent as AppVm).playingGameSize;
    if (!gameSize) return this.$router.push(HomeRoute.NAME);
    // this.game = Game.create(gameSize!.baseHeight, gameSize!.baseWidth);
    this.gameId = CreateGoodGameLogic.create(
      gameSize!.baseHeight,
      gameSize!.baseWidth
    ).execute();
    this.gameString = OutputAnswerStringLogic.create(
      this.gameId
    ).getAnswerString();
  }
}

import { Vue, Prop, Component } from 'vue-property-decorator';
import PlayingRoute from '@/router/config/playingRoute';
import BaseHeight from '@/business/valueobject/baseHeight';
import BaseWidth from '@/business/valueobject/baseWidth';
import Height from '@/business/valueobject/height';
import GameSize from '@/application/gameSize';
import AppVm from '@/app.vm';

/** TodoList.vueに対するViewModel */
@Component({})
export default class HomeVm extends Vue {
  protected baseHeightItems = BaseHeight.selectableValues;
  protected baseWidthItems = BaseWidth.selectableValues;
  protected baseHeightValue: number = 3;
  protected baseWidthValue: number = 3;
  private choseResult: GameSize | string = '';
  protected get gameSize(): string {
    this.choseResult = GameSize.create(
      this.baseHeightValue,
      this.baseWidthValue
    );
    return this.choseResult instanceof GameSize
      ? this.choseResult.gameSizeString
      : this.choseResult;
  }
  protected get startBtnEnabled(): boolean {
    return this.choseResult instanceof GameSize;
  }

  protected gameStart() {
    if (!this.startBtnEnabled) return;
    (this.$parent as AppVm).playingGameSize = this.choseResult as GameSize;
    this.$router.push(PlayingRoute.NAME);
  }
}

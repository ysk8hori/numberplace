import { Vue, Prop, Component } from 'vue-property-decorator';
import GameSize from './application/gameSize';

/** TodoList.vueに対するViewModel */
@Component({})
export default class AppVm extends Vue {
  private _playingGameSize: GameSize | undefined;
  public get playingGameSize(): GameSize | undefined {
    return this._playingGameSize;
  }
  public set playingGameSize(value: GameSize | undefined) {
    this._playingGameSize = value;
  }
}

import { Vue, Prop, Component } from 'vue-property-decorator';
import GameSize from './application/entity/gameSize';
import AppLayout from '@/components/AppLayout.vue';
import { Trace } from './utils/trace';

/** TodoList.vueに対するViewModel */
@Component({ components: { AppLayout } })
export default class AppVm extends Vue {
  private _playingGameSize: GameSize | undefined;
  public get playingGameSize(): GameSize | undefined {
    return this._playingGameSize;
  }
  public set playingGameSize(value: GameSize | undefined) {
    this._playingGameSize = value;
  }
}

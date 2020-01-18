import { Vue, Prop, Component } from 'vue-property-decorator';
import PlayingRoute from '@/router/config/playingRoute';

/** TodoList.vueに対するViewModel */
@Component({})
export default class HomeVm extends Vue {
  protected randomCreate() {
    this.$router.push(PlayingRoute.NAME);
  }
}

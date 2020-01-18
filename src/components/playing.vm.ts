import { Vue, Prop, Component } from 'vue-property-decorator';

/** TodoList.vueに対するViewModel */
@Component({})
export default class PlayingVm extends Vue {
  protected message = 'PLAY';
}

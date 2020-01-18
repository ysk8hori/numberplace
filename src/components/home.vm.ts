import { Vue, Prop, Component } from 'vue-property-decorator';

/** TodoList.vueに対するViewModel */
@Component({})
export default class HomeVm extends Vue {
  protected message = 'Hello asdf';
}

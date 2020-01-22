import { Vue, Prop, Component } from 'vue-property-decorator';
import UserCell from '@/application/entity/userCell';

@Component({})
export default class NCellVm extends Vue {
  @Prop()
  protected userCell!: UserCell;
}

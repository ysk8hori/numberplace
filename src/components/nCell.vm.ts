import { Vue, Prop, Component } from 'vue-property-decorator';
import UserCell from '@/application/entity/userCell';
import SelectCell from '@/application/state/selectCell';

@Component({})
export default class NCellVm extends Vue {
  @Prop()
  protected userCell!: UserCell;

  protected isSelected = false;
  public mounted() {
    this.userCell.setUnselectCallback(this.unselect);
  }

  private unselect() {
    this.isSelected = false;
  }

  public onClick() {
    this.isSelected = true;
    SelectCell.getInstance(this.userCell.gameId).select(this.userCell);
  }
}

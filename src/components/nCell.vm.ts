import { Vue, Prop, Component } from 'vue-property-decorator';
import UserCell from '@/application/entity/userCell';
import SelectCell from '@/application/state/selectCell';
import { Trace } from '@/utils/trace';

@Component({})
export default class NCellVm extends Vue {
  @Prop()
  protected userCell!: UserCell;

  protected isSelected = false;
  public mounted() {
    this.isSelected = SelectCell.instance.isSelectedCell(this.userCell);
    this.userCell.setUnselectCallback(this.unselect);
  }

  @Trace
  private unselect() {
    this.isSelected = false;
  }

  public onClick() {
    this.isSelected = true;
    SelectCell.instance.select(this.userCell);
  }
}

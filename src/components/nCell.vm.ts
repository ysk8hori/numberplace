import { Vue, Prop, Component } from 'vue-property-decorator';
import UserCell from '@/application/entity/userCell';
import SelectCellLogic from '@/application/logic/selectCellLogic';

@Component({})
export default class NCellVm extends Vue {
  @Prop()
  protected userCell!: UserCell;

  protected isSelected = false;
  public mounted() {
    this.userCell.setUnselectCallback(this.unselect);
    this.userCell.setSelectCallback(this.select);
  }

  private unselect() {
    this.isSelected = false;
  }

  public onClick() {
    SelectCellLogic.create(
      this.userCell.gameId,
      this.userCell.position
    ).execute();
  }

  private select() {
    this.isSelected = true;
  }
}

import { Vue, Prop, Component } from 'vue-property-decorator';
import UserCell from '@/application/entity/userCell';
import SelectCellLogic from '@/application/logic/selectCellLogic';
import Answer from '@/core/valueobject/answer';

@Component({})
export default class NCellVm extends Vue {
  @Prop()
  protected userCell!: UserCell;
  protected answer: string = '';
  protected changeable = false;
  /** Cellのスタイル。デフォルト値はmountedにて上書きされる。 */
  protected cellStyle = { width: '26px', height: '26px', fontSize: '26px' };

  protected isSelected = false;
  public mounted() {
    this.userCell.setUnselectCallback(this.unselect);
    this.userCell.setSelectCallback(this.select);
    this.userCell.setFillCallback(this.fill);
    this.answer = this.userCell.answer?.value ?? '';
    this.changeable = this.userCell.answer === undefined;
    this.cellStyle = this.userCell.cellSize.getStyle();
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

  private fill(answer: Answer) {
    this.answer = answer.value;
  }
}

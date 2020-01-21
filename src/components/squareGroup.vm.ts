import { Vue, Prop, Component } from 'vue-property-decorator';
import Group from '@/business/entity/group';
import Cell from '@/business/entity/cell';
import UserCell from '@/application/entity/userCell';

@Component({})
export default class SquareGroupVm extends Vue {
  @Prop()
  private group!: Group;

  protected cellGrid?: UserCell[][];

  public created() {
    this.cellGrid = Array.from(this.group.range.fetchRowsInOrder()).map(cells =>
      cells.map(cell => UserCell.create(cell))
    );
  }
}

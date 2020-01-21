import { Vue, Prop, Component } from 'vue-property-decorator';
import Group from '@/business/entity/group';
import Cell from '@/business/entity/cell';

@Component({})
export default class SquareGroupVm extends Vue {
  @Prop()
  private group!: Group;

  protected cellGrid?: Cell[][];

  public created() {
    this.cellGrid = Array.from(this.group.range.fetchRowsInOrder());
  }
}

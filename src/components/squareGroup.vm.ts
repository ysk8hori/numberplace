import { Vue, Prop, Component } from 'vue-property-decorator';
import Group from '@/business/entity/group';
import Cell from '@/business/entity/cell';
import UserCell from '@/application/entity/userCell';
import NCell from '@/components/NCell.vue';
import { autoInjectable, inject } from 'tsyringe';
import CellRepository from '@/business/repository/cellRepository';
import UserCellRepository from '@/application/repository/userCellRepository';
import BusinessError from '@/business/businessError';

@autoInjectable()
@Component({ components: { NCell } })
export default class SquareGroupVm extends Vue {
  @Prop()
  private group!: Group;

  protected cellGrid?: UserCell[][];

  public created() {
    this.cellGrid = Array.from(this.group.range.fetchRowsInOrder()).map(cells =>
      cells.map(cell => UserCellRepository.findByPosition(cell.position))
    );
  }
}

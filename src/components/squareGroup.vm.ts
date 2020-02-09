import { Vue, Prop, Component } from 'vue-property-decorator';
import Group from '@/core/entity/group';
import Cell from '@/core/entity/cell';
import UserCell from '@/application/entity/userCell';
import NCell from '@/components/NCell.vue';
import { autoInjectable, inject } from 'tsyringe';
import CellRepository from '@/core/repository/cellRepository';
import UserCellRepository from '@/application/repository/userCellRepository';
import BusinessError from '@/core/businessError';
import CreateCellGridLogic from '@/application/logic/createCellGridLogic';
import GameID from '@/core/valueobject/gameId';

@autoInjectable()
@Component({ components: { NCell } })
export default class SquareGroupVm extends Vue {
  @Prop()
  private gameId!: GameID;
  @Prop()
  private group!: Group;

  protected cellGrid?: UserCell[][];

  public created() {
    this.cellGrid = CreateCellGridLogic.create(
      this.gameId,
      this.group.groupId
    ).execute();
  }
}

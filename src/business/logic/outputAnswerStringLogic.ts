import GameID from '@/business/valueobject/gameId';
import { inject, autoInjectable } from 'tsyringe';
import GameRepository from '@/business/repository/gameRepository';
import Game from '@/business/entity/game';
import BusinessError from '@/business/businessError';
import CellRepository from '@/business/repository/cellRepository';
import GroupRepository from '@/business/repository/groupRepository';
import { GroupType } from '@/business/entity/group';

@autoInjectable()
export default class OutputAnswerStringLogic {
  public static create(gameId: GameID): OutputAnswerStringLogic {
    return new OutputAnswerStringLogic(gameId);
  }
  constructor(
    private gameId: GameID,
    @inject('CellRepository')
    cellRepository?: CellRepository,
    @inject('GroupRepository')
    groupRepository?: GroupRepository,
    @inject('GameRepository')
    gameRepository?: GameRepository
  ) {
    if (!cellRepository || !groupRepository || !gameRepository)
      BusinessError.throw(
        OutputAnswerStringLogic.name,
        'constructor',
        'リポジトリが指定されていません。'
      );
    this.groupRepository = groupRepository;
  }
  private groupRepository: GroupRepository;
  public getAnswerString(): string {
    return this.groupRepository
      .findByType(this.gameId, GroupType.Horizontal)
      .map(row =>
        row.cells.map(cell => cell.getAnswer()?.value ?? ' ').join('|')
      )
      .join('\n');
  }
}

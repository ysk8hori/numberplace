import GameID from '@/business/valueobject/gameId';
import { inject, autoInjectable } from 'tsyringe';
import UserCellRepository from '../repository/userCellRepository';
import BusinessError from '@/business/businessError';
import GroupID from '@/business/valueobject/groupId';
import GroupRepository from '@/business/repository/groupRepository';
import UserCell from '../entity/userCell';

@autoInjectable()
export default class CreateCellGridLogic {
  public static create(gameId: GameID, groupId: GroupID): CreateCellGridLogic {
    return new CreateCellGridLogic(gameId, groupId);
  }
  constructor(
    private gameId: GameID,
    private groupId: GroupID,
    @inject('GroupRepository')
    groupRepository?: GroupRepository,
    @inject('UserCellRepository')
    userCellRepository?: UserCellRepository
  ) {
    if (!groupRepository || !userCellRepository) {
      BusinessError.throw(
        CreateCellGridLogic.name,
        'constructor',
        'リポジトリが指定されていません。'
      );
    }
    this.groupRepository = groupRepository;
    this.userCellRepository = userCellRepository;
  }
  private userCellRepository: UserCellRepository;
  private groupRepository: GroupRepository;

  public execute(): UserCell[][] {
    return Array.from(
      this.groupRepository
        .find(this.gameId, this.groupId)
        ?.range.fetchRowsInOrder()
    ).map(cells =>
      cells.map(cell =>
        this.userCellRepository.findByPosition(this.gameId, cell.position)
      )
    );
  }
}

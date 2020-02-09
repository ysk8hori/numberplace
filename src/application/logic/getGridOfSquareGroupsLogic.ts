import GameID from '@/core/valueobject/gameId';
import Group, { GroupType } from '@/core/entity/group';
import { inject, autoInjectable } from 'tsyringe';
import CellRepository from '@/core/repository/cellRepository';
import GroupRepository from '@/core/repository/groupRepository';
import GameRepository from '@/core/repository/gameRepository';
import BusinessError from '@/core/businessError';
import Utils from '@/utils/utils';

@autoInjectable()
export default class GetGridOfSquareGroupsLogic {
  public static create(gameId: GameID): GetGridOfSquareGroupsLogic {
    return new GetGridOfSquareGroupsLogic(gameId);
  }
  constructor(
    private gameId: GameID,
    // @inject('CellRepository')
    // cellRepository?: CellRepository,
    @inject('GroupRepository')
    groupRepository?: GroupRepository,
    @inject('GameRepository')
    gameRepository?: GameRepository
  ) {
    if (!groupRepository || !gameRepository) {
      BusinessError.throw(
        GetGridOfSquareGroupsLogic.name,
        'constructor',
        'リポジトリが指定されていません。'
      );
    }
    this.groupRepository = groupRepository;
    this.gameRepository = gameRepository;
  }
  /**
   * SquareGroupの2次元配列。
   */
  private _grid?: Group[][];
  private groupRepository!: GroupRepository;
  private gameRepository!: GameRepository;
  public get grid(): Group[][] | undefined {
    return this._grid;
  }

  public execute(): Group[][] {
    this._grid = [];
    const sGroups = this.groupRepository.findByType(
      this.gameId,
      GroupType.Square
    );
    const baseHeight = this.gameRepository.find(this.gameId).baseHeight;
    const baseWidth = this.gameRepository.find(this.gameId).baseWidth;
    Utils.createArray(baseWidth.value).forEach(rowNo => {
      this._grid!.push(
        Utils.createArray(baseHeight.value).reduce((previous, colNo) => {
          previous.push(sGroups.shift()!);
          return previous;
        }, new Array<Group>())
      );
    });
    return this._grid;
  }
}

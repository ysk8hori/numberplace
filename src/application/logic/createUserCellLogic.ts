import GameID from '@/core/valueobject/gameId';
import { autoInjectable, inject } from 'tsyringe';
import CellRepository from '@/core/repository/cellRepository';
import BusinessError from '@/core/businessError';
import DeleteGameLogic from '@/core/logic/deleteGameLogic';
import UserCellRepository from '../repository/userCellRepository';
import UserCell from '../entity/userCell';
import WindowHeight from '../valueObject/windowHeight';
import WindowWidth from '../valueObject/windowWidth';
import GameSize from '../entity/gameSize';
import CellStyle from '../valueObject/cellStyle';

@autoInjectable()
export default class CreateUserCellLogic {
  public static createAndExecute(
    gameId: GameID,
    gameSize: GameSize,
    windowHeight: WindowHeight,
    windowWidth: WindowWidth
  ) {
    new CreateUserCellLogic(
      gameId,
      gameSize,
      windowHeight,
      windowWidth
    ).execute();
  }
  constructor(
    private gameId: GameID,
    private gameSize: GameSize,
    private windowHeight: WindowHeight,
    private windowWidth: WindowWidth,
    @inject('CellRepository')
    cellRepository?: CellRepository,
    @inject('UserCellRepository')
    userCellRepository?: UserCellRepository
  ) {
    if (!cellRepository || !userCellRepository) {
      BusinessError.throw(
        DeleteGameLogic.name,
        'constructor',
        'リポジトリが指定されていません。'
      );
    }
    this.cellRepository = cellRepository;
    this.userCellRepository = userCellRepository;
  }
  private cellRepository: CellRepository;
  private userCellRepository: UserCellRepository;

  public execute() {
    // Cellのサイズ等の計算はuserCellクラスの責務とはせず、
    // CalcCellSizeLogicでの計算結果を一律適用する。
    const cellSize = CellStyle.create(
      this.gameSize,
      this.windowHeight,
      this.windowWidth
    );
    this.cellRepository.findAll(this.gameId).forEach(cell => {
      this.userCellRepository.push(
        this.gameId,
        UserCell.create(this.gameId, cell, cellSize)
      );
    });
  }
}

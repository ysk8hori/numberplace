import GameID from '@/business/valueobject/gameId';
import { autoInjectable, inject } from 'tsyringe';
import CellRepository from '@/business/repository/cellRepository';
import BusinessError from '@/business/businessError';
import DeleteGameLogic from '@/business/logic/deleteGameLogic';
import UserCellRepository from '../repository/userCellRepository';
import UserCell from '../entity/userCell';
import WindowHeight from '../valueObject/windowHeight';
import WindowWidth from '../valueObject/windowWidth';
import GameRepository from '@/business/repository/gameRepository';
import CalcCellSize from './calcCellSize';
import GameSize from '../entity/gameSize';

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
    const cellSize = CalcCellSize.create(
      this.windowHeight,
      this.windowWidth,
      this.gameSize
    ).execute();
    this.cellRepository.findAll(this.gameId).forEach(cell => {
      this.userCellRepository.push(
        this.gameId,
        UserCell.create(this.gameId, cell, cellSize)
      );
    });
  }
}

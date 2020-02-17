import UserCellRepository from '../repository/userCellRepository';
import { inject, autoInjectable } from 'tsyringe';
import BusinessError from '@/core/businessError';
import GameID from '@/core/valueobject/gameId';
import UserCell from '../entity/userCell';
import CellPosition, { pos } from '@/core/valueobject/cellPosition';
import VerticalPosition, { vPos } from '@/core/valueobject/verticalPosition';
import HorizontalPosition from '@/core/valueobject/horizontalPosition';
import SelectCellLogic from '../logic/selectCellLogic';
import GameRepository from '@/core/repository/gameRepository';

@autoInjectable()
export default class MouseEventForControllingGame {
  /** セルを一つ移動するのに必要なマウス移動 */
  private static readonly PIXEL_REQUIRED_TO_MOVE_ONE = 10;

  public static create(gameId: GameID): MouseEventForControllingGame {
    return new MouseEventForControllingGame(gameId);
  }

  constructor(
    private gameId: GameID,
    @inject('UserCellRepository') userCellRepository?: UserCellRepository,
    @inject('GameRepository') gameRepository?: GameRepository
  ) {
    if (!userCellRepository || !gameRepository) {
      BusinessError.throw(
        MouseEventForControllingGame.name,
        'constructor',
        'リポジトリが指定されていません。'
      );
    }
    this.userCellRepository = userCellRepository;
    this.gameRepository = gameRepository;
  }

  private userCellRepository: UserCellRepository;
  private gameRepository: GameRepository;
  private startOffsetX!: number;
  private startOffsetY!: number;
  private startingCell!: UserCell;

  public moveStarted(offsetX: number, offsetY: number) {
    this.startOffsetX = offsetX;
    this.startOffsetY = offsetY;
    this.startingCell =
      this.userCellRepository.findSelectedCell(this.gameId) ??
      this.userCellRepository.findByPosition(this.gameId, pos(0, 0)); // move開始時に選択したセルがない場合は0,0を選択しているものとする。
  }

  /**
   * startOffsetから10px動いたら1セル移動ってことにする。
   */
  public moving(offsetX: number, offsetY: number) {
    const threshold = MouseEventForControllingGame.PIXEL_REQUIRED_TO_MOVE_ONE;
    const verticalDistance = offsetY - this.startOffsetY;
    const horizontalDistance = offsetX - this.startOffsetX;
    let nextVerticalPosition: VerticalPosition = this.startingCell.position.verticalPosition.clone();
    let nextHorizontalPosition: HorizontalPosition = this.startingCell.position.horizontalPosition.clone();
    nextVerticalPosition = this.startingCell.position.verticalPosition
      .clone()
      .move(
        Math.sign(verticalDistance) *
          Math.floor(Math.abs(verticalDistance) / threshold)
      );
    nextVerticalPosition =
      nextVerticalPosition.value < 0
        ? vPos(0)
        : this.gameRepository.find(this.gameId).gameSize.size <=
          nextVerticalPosition.value
        ? vPos(this.gameRepository.find(this.gameId).gameSize.size)
        : nextVerticalPosition;

    nextHorizontalPosition = this.startingCell.position.horizontalPosition
      .clone()
      .move(
        Math.sign(horizontalDistance) *
          Math.floor(Math.abs(horizontalDistance) / threshold)
      );

    const nextCellPosition = CellPosition.create(
      nextVerticalPosition,
      nextHorizontalPosition
    );
    SelectCellLogic.create(this.gameId, nextCellPosition).execute();
  }
}

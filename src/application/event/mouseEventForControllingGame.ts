import UserCellRepository from '../repository/userCellRepository';
import { inject, autoInjectable } from 'tsyringe';
import BusinessError from '@/core/businessError';
import GameID from '@/core/valueobject/gameId';
import UserCell from '../entity/userCell';
import CellPosition, { pos } from '@/core/valueobject/cellPosition';
import VerticalPosition, { vPos } from '@/core/valueobject/verticalPosition';
import HorizontalPosition, {
  hPos
} from '@/core/valueobject/horizontalPosition';
import SelectCellLogic from '../logic/selectCellLogic';
import GameRepository from '@/core/repository/gameRepository';

@autoInjectable()
export default class MouseEventForControllingGame {
  /** セルを一つ移動するのに必要なマウス移動 */
  private static readonly PIXEL_REQUIRED_TO_MOVE_ONE = 15;

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
    this.userCellRepository.findSelectedCell(this.gameId) ??
      SelectCellLogic.create(this.gameId, pos(0, 0)).execute();
    this.startingCell = this.userCellRepository.findSelectedCell(this.gameId)!;
  }

  /**
   * startOffsetから10px動いたら1セル移動ってことにする。
   */
  public moving(offsetX: number, offsetY: number) {
    SelectCellLogic.create(
      this.gameId,
      CellPosition.create(
        this.calculateNextVerticalPosition(
          this.calculateVerticalDistance(offsetY)
        ),
        this.calculateNextHorizontalPosition(
          this.calculateHorizontalDistance(offsetX)
        )
      )
    ).execute();
  }

  private calculateHorizontalDistance(offsetX: number): number {
    return offsetX - this.startOffsetX;
  }

  private calculateVerticalDistance(offsetY: number): number {
    return offsetY - this.startOffsetY;
  }

  private calculateNextVerticalPosition(
    verticalDistance: number
  ): VerticalPosition {
    // 縦方向の移動を行う
    let nextVerticalPosition = this.startingCell.position.verticalPosition
      .clone()
      .move(
        Math.sign(verticalDistance) *
          Math.floor(
            Math.abs(verticalDistance) /
              MouseEventForControllingGame.PIXEL_REQUIRED_TO_MOVE_ONE
          )
      );
    // ゲーム盤の範囲に収まるように調整する。
    nextVerticalPosition =
      nextVerticalPosition.value < 0
        ? vPos(0)
        : this.gameRepository.find(this.gameId).gameSize.size <=
          nextVerticalPosition.value
        ? vPos(this.gameRepository.find(this.gameId).gameSize.size - 1)
        : nextVerticalPosition;
    return nextVerticalPosition;
  }
  private calculateNextHorizontalPosition(
    horizontalDistance: number
  ): HorizontalPosition {
    // 横方向の移動を行う
    let nextHorizontalPosition = this.startingCell.position.horizontalPosition
      .clone()
      .move(
        Math.sign(horizontalDistance) *
          Math.floor(
            Math.abs(horizontalDistance) /
              MouseEventForControllingGame.PIXEL_REQUIRED_TO_MOVE_ONE
          )
      );
    // ゲーム盤の範囲に収まるように調整する。
    nextHorizontalPosition =
      nextHorizontalPosition.value < 0
        ? hPos(0)
        : this.gameRepository.find(this.gameId).gameSize.size <=
          nextHorizontalPosition.value
        ? hPos(this.gameRepository.find(this.gameId).gameSize.size - 1)
        : nextHorizontalPosition;

    return nextHorizontalPosition;
  }
}

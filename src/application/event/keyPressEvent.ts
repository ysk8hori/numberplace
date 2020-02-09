import { Trace } from '@/utils/trace';
import SelectCellLogic from '../logic/selectCellLogic';
import Logic from '../logic/logic';
import { inject, autoInjectable } from 'tsyringe';
import UserCellRepository from '../repository/userCellRepository';
import BusinessError from '@/core/businessError';
import GameID from '@/core/valueobject/gameId';
import CellPosition, { pos } from '@/core/valueobject/cellPosition';
import GameIdRepository from '../repository/gameIdRepository';
import GameRepository from '@/core/repository/gameRepository';
import Game from '@/core/entity/game';
import UserAnswerLogic from '../logic/userAnswerLogic';
import Answer from '@/core/valueobject/answer';

@autoInjectable()
export default class KeyPressEvent {
  public static createLogic(event: KeyboardEvent): Logic | undefined {
    // console.log(`code:${event.code}, key:${event.key}`);
    return new KeyPressEvent(event).createLogic();
  }
  constructor(
    private event: KeyboardEvent,
    @inject('UserCellRepository') userCellRepository?: UserCellRepository,
    @inject('GameIdRepository') gameIdRepository?: GameIdRepository,
    @inject('GameRepository') gameRepository?: GameRepository
  ) {
    if (!userCellRepository || !gameIdRepository || !gameRepository) {
      BusinessError.throw(
        KeyPressEvent.name,
        'constructor',
        'リポジトリが指定されていません。'
      );
    }
    this.userCellRepository = userCellRepository;
    this.game = gameIdRepository.getCurrentGameId()
      ? gameRepository.find(gameIdRepository.getCurrentGameId()!)
      : undefined;
  }
  private userCellRepository: UserCellRepository;
  private game: Game | undefined;

  public createLogic(): Logic | undefined {
    return this.game
      ? this.isArrowKey()
        ? this.createSelectCellLogic()
        : this.createUserAnswerLogic()
      : undefined;
  }

  private isArrowKey(): boolean {
    return (
      [
        KeyPressEvent.UP,
        KeyPressEvent.DOWN,
        KeyPressEvent.LEFT,
        KeyPressEvent.RIGHT
      ].indexOf(this.event.code) !== -1
    );
  }

  private createUserAnswerLogic(): UserAnswerLogic | undefined {
    if (this.event.key === 'Backspace') {
      return UserAnswerLogic.create(this.game!.gameId, Answer.create(''));
    }
    if (
      this.game?.answerCandidateCollection
        .getAnswerCandidateStringArray()
        .indexOf(this.event.key) === -1
    ) {
      return;
    }
    return UserAnswerLogic.create(
      this.game!.gameId,
      Answer.create(this.event.key)
    );
  }

  private createSelectCellLogic(): SelectCellLogic {
    return SelectCellLogic.create(this.game!.gameId, this.getNextPosition());
  }
  private static readonly UP = 'ArrowUp';
  private static readonly DOWN = 'ArrowDown';
  private static readonly RIGHT = 'ArrowRight';
  private static readonly LEFT = 'ArrowLeft';

  private getNextPosition(): CellPosition {
    const position =
      this.userCellRepository.findSelectedCell(this.game!.gameId)?.position ??
      pos(0, 0);

    const gameSize = this.game!.baseHeight.value * this.game!.baseWidth.value;

    let verticalPosition = position.verticalPosition.clone();
    let horizontalPosition = position.horizontalPosition.clone();
    switch (this.event.code) {
      case KeyPressEvent.UP:
        verticalPosition.move(-1);
        break;
      case KeyPressEvent.DOWN:
        verticalPosition.move(1);
        break;
      case KeyPressEvent.RIGHT:
        horizontalPosition.move(1);
        break;
      case KeyPressEvent.LEFT:
        horizontalPosition.move(-1);
        break;
    }
    if (verticalPosition.value < 0) verticalPosition.move(gameSize);
    if (gameSize <= verticalPosition.value) verticalPosition.move(-gameSize);
    if (horizontalPosition.value < 0) horizontalPosition.move(gameSize);
    if (gameSize <= horizontalPosition.value)
      horizontalPosition.move(-gameSize);

    return CellPosition.create(verticalPosition, horizontalPosition);
  }
}

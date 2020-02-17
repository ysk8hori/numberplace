import { Vue, Prop, Component } from 'vue-property-decorator';
import UserAnswerLogic from '@/application/logic/userAnswerLogic';
import Answer from '@/core/valueobject/answer';
import GameID from '@/core/valueobject/gameId';
import MouseEventForControllingGame from '@/application/event/mouseEventForControllingGame';

@Component({})
export default class NumberPlaceControllerVm extends Vue {
  @Prop()
  protected gameId!: GameID;
  protected fill(answer: number) {
    UserAnswerLogic.create(this.gameId!, Answer.create(answer)).execute();
  }

  private mouseEventForControllingGame:
    | MouseEventForControllingGame
    | undefined;

  protected mousedown(event: TouchEvent) {
    this.mouseEventForControllingGame = MouseEventForControllingGame.create(
      this.gameId
    );
    this.mouseEventForControllingGame.moveStarted(
      event.targetTouches[0].screenX,
      event.targetTouches[0].screenY
    );
  }

  protected mousemove(event: TouchEvent) {
    this.mouseEventForControllingGame?.moving(
      event.targetTouches[0].screenX,
      event.targetTouches[0].screenY
    );
  }

  protected stop(event: TouchEvent) {
    this.mouseEventForControllingGame = undefined;
  }
}

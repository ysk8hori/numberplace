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
}

import { Vue, Prop, Component } from 'vue-property-decorator';
import UserAnswerLogic from '@/application/logic/userAnswerLogic';
import Answer from '@/core/valueobject/answer';
import GameID from '@/core/valueobject/gameId';
import NumberPlate from '@/application/valueObject/numberPlate';

@Component({})
export default class NumberPlaceControllerVm extends Vue {
  @Prop()
  protected gameId!: GameID;
  protected fill(answer: number) {
    UserAnswerLogic.create(this.gameId!, Answer.create(answer)).execute();
  }

  protected numberPlates: NumberPlate[] = [];
  public created() {
    this.numberPlates = NumberPlate.createList(9);
  }
}

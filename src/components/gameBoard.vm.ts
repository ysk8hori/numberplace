import { Vue, Component, Prop } from 'vue-property-decorator';
import GameID from '@/core/valueobject/gameId';
import Group from '@/core/entity/group';
import SquareGroup from './SquareGroup.vue';

@Component({ components: { SquareGroup } })
export default class GameBoardVm extends Vue {
  @Prop()
  protected gameId: GameID | undefined;
  @Prop()
  protected groupGrid!: Group[][];
}

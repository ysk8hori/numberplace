import { Vue, Prop, Component } from 'vue-property-decorator';
import HomeRoute from '@/router/config/homeRoute';

@Component({})
export default class AppLayoutVm extends Vue {
  protected drawer = null;
  protected home = '/';
  public created() {
    this.$vuetify.theme.dark = true;
  }
}

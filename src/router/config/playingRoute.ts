import { RouteConfig } from 'vue-router';
import Playing from '@/components/Playing.vue';

export default class PlayingRoute implements RouteConfig {
  public static NAME = 'playing';
  constructor() {}
  public static create(): PlayingRoute {
    return new PlayingRoute();
  }
  public readonly path = '/playing';
  public readonly name = PlayingRoute.NAME;
  public readonly component = Playing;
  public readonly children = [];
}

import { RouteConfig } from 'vue-router';
// import Home from '@/views/home.vm';
import Home from '@/components/Home.vue';

export default class HomeRoute implements RouteConfig {
  public static NAME = 'name';
  constructor() {}
  public static create(): HomeRoute {
    return new HomeRoute();
  }
  public readonly path = '/';
  public readonly name = HomeRoute.NAME;
  public readonly component = Home;
  public readonly children = [];
}

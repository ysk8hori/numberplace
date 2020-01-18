import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
// import Home from '@/views/home.vm';
import Home from '@/views/Home.vue';

Vue.use(VueRouter);

class Index implements RouteConfig {
  private constructor() {}
  public static create(): Index {
    return new Index();
  }
  public readonly path = '/';
  public readonly name = 'home';
  public readonly component = Home;
  public readonly children = [];
}

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [Index.create()]
});

export default router;

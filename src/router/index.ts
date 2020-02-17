import Vue from 'vue';
import VueRouter from 'vue-router';
import HomeRoute from './config/homeRoute';
import PlayingRoute from './config/playingRoute';

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    HomeRoute.create(),
    PlayingRoute.create(),
    { path: '*', redirect: '/' }
  ]
});

export default router;

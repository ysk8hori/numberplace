import 'reflect-metadata';
import { container } from 'tsyringe';
import CellRepository from '@/business/repository/cellRepository';
import CellRepositoryImpl from '@/repository/cellRepositoryImpl';
import GroupRepository from '@/business/repository/groupRepository';
import GroupRepositoryImpl from '@/repository/groupRepositoryImpl';
import GameRepository from '@/business/repository/gameRepository';
import GameRepositoryImpl from '@/repository/gameRepositoryImpl';
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import vuetify from './plugins/vuetify';

container.register<CellRepository>('CellRepository', {
  useClass: CellRepositoryImpl
});
container.register<GroupRepository>('GroupRepository', {
  useClass: GroupRepositoryImpl
});
container.register<GameRepository>('GameRepository', {
  useClass: GameRepositoryImpl
});

Vue.config.productionTip = false;

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app');

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
import UserCellRepository from './application/repository/userCellRepository';
import UserCellRepositoryImpl from './repository/userCellRepositoryImpl';
import KeyPressEvent from '@/application/event/keyPressEvent';
import GameIdRepository from './application/repository/gameIdRepository';
import GameIdRepositoryImpl from './repository/gameIdRepository';

container.register<CellRepository>('CellRepository', {
  useValue: CellRepositoryImpl.create()
});
container.register<GroupRepository>('GroupRepository', {
  useValue: GroupRepositoryImpl.create()
});
container.register<GameRepository>('GameRepository', {
  useValue: GameRepositoryImpl.create()
});
container.register<UserCellRepository>('UserCellRepository', {
  useValue: UserCellRepositoryImpl.create()
});
container.register<GameIdRepository>('GameIdRepository', {
  useValue: GameIdRepositoryImpl.create()
});

Vue.config.productionTip = false;

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app');

window.addEventListener('keydown', event => {
  KeyPressEvent.createLogic(event)?.execute();
});

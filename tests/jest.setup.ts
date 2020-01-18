import 'reflect-metadata';
import { container } from 'tsyringe';
import CellRepository from '@/business/repository/cellRepository';
import CellRepositoryImpl from '@/repository/cellRepositoryImpl';
import GroupRepository from '@/business/repository/groupRepository';
import GroupRepositoryImpl from '@/repository/groupRepositoryImpl';
import GameRepository from '@/business/repository/gameRepository';
import GameRepositoryImpl from '@/repository/gameRepositoryImpl';

container.register<CellRepository>('CellRepository', {
  useClass: CellRepositoryImpl
});
container.register<GroupRepository>('GroupRepository', {
  useClass: GroupRepositoryImpl
});
container.register<GameRepository>('GameRepository', {
  useClass: GameRepositoryImpl
});

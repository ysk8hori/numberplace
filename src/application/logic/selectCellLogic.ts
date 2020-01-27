import CellPosition from '@/business/valueobject/cellPosition';
import { autoInjectable, inject } from 'tsyringe';
import UserCellRepository from '../repository/userCellRepository';
import BusinessError from '@/business/businessError';

@autoInjectable()
export default class SelectCellLogic {
  public static create(position: CellPosition): SelectCellLogic {
    return new SelectCellLogic(position);
  }
  constructor(
    private position: CellPosition,
    @inject('UserCellRepository') userCellRepository?: UserCellRepository
  ) {
    if (!userCellRepository) {
      BusinessError.throw(
        SelectCellLogic.name,
        'constructor',
        'リポジトリが指定されていません。'
      );
    }
    this.userCellRepository = userCellRepository;
  }
  private userCellRepository: UserCellRepository;
  public execute() {
    // this.userCellRepository.
  }
}

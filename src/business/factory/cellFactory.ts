import Cell from '@/business/entity/cell';
import CellPosition from '@/business/valueobject/cellPosition';
import Height from '@/business/valueobject/height';
import Width from '@/business/valueobject/width';
import AnswerCandidateCollection from '@/business/answerCandidateCollection';
import BaseWidth from '@/business/valueobject/baseWidth';
import BaseHeight from '@/business/valueobject/baseHeight';
import CellCollection from '@/business/cellCollection';
import CellRepository from '@/business/repository/cellRepository';
import GameID from '@/business/valueobject/gameId';
import { autoInjectable, inject } from 'tsyringe';

@autoInjectable()
export default class CellFactory {
  public static create(
    gameId: GameID,
    baseHeight: BaseHeight,
    baseWidth: BaseWidth,
    answerCandidateCollectionOrg: AnswerCandidateCollection
  ): CellFactory {
    return new CellFactory(
      gameId,
      baseHeight,
      baseWidth,
      answerCandidateCollectionOrg
    );
  }

  constructor(
    private gameId: GameID,
    private baseHeight: BaseHeight,
    private baseWidth: BaseWidth,
    private answerCandidateCollectionOrg: AnswerCandidateCollection,
    @inject('CellRepository')
    private cellRepository?: CellRepository
  ) {}

  public createCells(): CellCollection {
    const cellArray: Cell[] = [];
    for (const pos of CellPosition.generate(
      Width.create(this.baseHeight, this.baseWidth),
      Height.create(this.baseHeight, this.baseWidth)
    )) {
      cellArray.push(
        Cell.create(this.gameId, pos, this.answerCandidateCollectionOrg.clone())
      );
    }
    const collection = CellCollection.create(cellArray);
    this.cellRepository!.regist(this.gameId, collection);
    return collection;
  }
}

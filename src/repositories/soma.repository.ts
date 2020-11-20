import {DefaultCrudRepository} from '@loopback/repository';
import {Soma, SomaRelations} from '../models';
import {MongoDsDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class SomaRepository extends DefaultCrudRepository<
  Soma,
  typeof Soma.prototype.id,
  SomaRelations
> {
  constructor(
    @inject('datasources.mongoDS') dataSource: MongoDsDataSource,
  ) {
    super(Soma, dataSource);
  }
  public soma(num1:number,num2:number) {
    return num1 + num2
  }
}

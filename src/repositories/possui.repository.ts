import {DefaultCrudRepository} from '@loopback/repository';
import {Possui, PossuiRelations} from '../models';
import {MongoDsDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class PossuiRepository extends DefaultCrudRepository<
  Possui,
  typeof Possui.prototype.id,
  PossuiRelations
> {
  constructor(
    @inject('datasources.mongoDS') dataSource: MongoDsDataSource,
  ) {
    super(Possui, dataSource);
  }
}

import {DefaultCrudRepository} from '@loopback/repository';
import {Foguete, FogueteRelations} from '../models';
import {MongoDsDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class FogueteRepository extends DefaultCrudRepository<
  Foguete,
  typeof Foguete.prototype.id,
  FogueteRelations
> {
  constructor(
    @inject('datasources.mongoDS') dataSource: MongoDsDataSource,
  ) {
    super(Foguete, dataSource);
  }
}

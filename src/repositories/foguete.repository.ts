import {DefaultCrudRepository} from '@loopback/repository';
import {Foguete, FogueteRelations} from '../models';
import {RethinkdbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class FogueteRepository extends DefaultCrudRepository<
  Foguete,
  typeof Foguete.prototype.id,
  FogueteRelations
> {
  constructor(
    @inject('datasources.rethinkdb') dataSource: RethinkdbDataSource,
  ) {
    super(Foguete, dataSource);
  }
}

import {DefaultCrudRepository} from '@loopback/repository';
import {Peso, PesoRelations} from '../models';
import {MongoDsDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class PesoRepository extends DefaultCrudRepository<
  Peso,
  typeof Peso.prototype.id,
  PesoRelations
> {
  constructor(
    @inject('datasources.mongoDS') dataSource: MongoDsDataSource,
  ) {
    super(Peso, dataSource);
  }
}

import {DefaultCrudRepository} from '@loopback/repository';
import {Temperatura, TemperaturaRelations} from '../models';
import {MongoDsDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class TemperaturaRepository extends DefaultCrudRepository<
  Temperatura,
  typeof Temperatura.prototype.id,
  TemperaturaRelations
> {
  constructor(
    @inject('datasources.mongoDS') dataSource: MongoDsDataSource,
  ) {
    super(Temperatura, dataSource);
  }
}

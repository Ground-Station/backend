import {DefaultCrudRepository} from '@loopback/repository';
import {Gps, GpsRelations} from '../models';
import {MongoDsDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class GpsRepository extends DefaultCrudRepository<
  Gps,
  typeof Gps.prototype.id,
  GpsRelations
> {
  constructor(
    @inject('datasources.mongoDS') dataSource: MongoDsDataSource,
  ) {
    super(Gps, dataSource);
  }
}

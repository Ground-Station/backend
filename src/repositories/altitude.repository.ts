import {DefaultCrudRepository} from '@loopback/repository';
import {Altitude, AltitudeRelations} from '../models';
import {MongoDsDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class AltitudeRepository extends DefaultCrudRepository<
  Altitude,
  typeof Altitude.prototype.id,
  AltitudeRelations
> {
  constructor(
    @inject('datasources.mongoDS') dataSource: MongoDsDataSource,
  ) {
    super(Altitude, dataSource);
  }
}

import {DefaultCrudRepository} from '@loopback/repository';
import {Hardware, HardwareRelations} from '../models';
import {MongoDsDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class HardwareRepository extends DefaultCrudRepository<
  Hardware,
  typeof Hardware.prototype.id,
  HardwareRelations
> {
  constructor(
    @inject('datasources.mongoDS') dataSource: MongoDsDataSource,
  ) {
    super(Hardware, dataSource);
  }
}

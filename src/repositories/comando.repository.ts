import {DefaultCrudRepository} from '@loopback/repository';
import {Comando, ComandoRelations} from '../models';
import {MongoDsDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class ComandoRepository extends DefaultCrudRepository<
  Comando,
  typeof Comando.prototype.id,
  ComandoRelations
> {
  constructor(
    @inject('datasources.mongoDS') dataSource: MongoDsDataSource,
  ) {
    super(Comando, dataSource);
  }
}

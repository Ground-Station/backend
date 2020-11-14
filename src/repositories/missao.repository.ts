import {DefaultCrudRepository} from '@loopback/repository';
import {Missao, MissaoRelations} from '../models';
import {MongoDsDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class MissaoRepository extends DefaultCrudRepository<
  Missao,
  typeof Missao.prototype.id,
  MissaoRelations
> {
  constructor(
    @inject('datasources.mongoDS') dataSource: MongoDsDataSource,
  ) {
    super(Missao, dataSource);
  }
}

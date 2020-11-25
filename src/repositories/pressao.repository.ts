import {DefaultCrudRepository} from '@loopback/repository';
import {Pressao, PressaoRelations} from '../models';
import {MongoDsDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class PressaoRepository extends DefaultCrudRepository<
  Pressao,
  typeof Pressao.prototype.id,
  PressaoRelations
> {
  constructor(
    @inject('datasources.mongoDS') dataSource: MongoDsDataSource,
  ) {
    super(Pressao, dataSource);
  }
}

import {DefaultCrudRepository} from '@loopback/repository';
import {Velocidade, VelocidadeRelations} from '../models';
import {MongoDsDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class VelocidadeRepository extends DefaultCrudRepository<
  Velocidade,
  typeof Velocidade.prototype.id,
  VelocidadeRelations
> {
  constructor(
    @inject('datasources.mongoDS') dataSource: MongoDsDataSource,
  ) {
    super(Velocidade, dataSource);
  }
}

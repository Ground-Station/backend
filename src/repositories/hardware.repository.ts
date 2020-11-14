import {DefaultCrudRepository, repository, HasManyThroughRepositoryFactory} from '@loopback/repository';
import {Hardware, HardwareRelations, Comando, Possui} from '../models';
import {MongoDsDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {PossuiRepository} from './possui.repository';
import {ComandoRepository} from './comando.repository';

export class HardwareRepository extends DefaultCrudRepository<
  Hardware,
  typeof Hardware.prototype.id,
  HardwareRelations
> {

  public readonly hardwareComandos: HasManyThroughRepositoryFactory<Comando, typeof Comando.prototype.id,
          Possui,
          typeof Hardware.prototype.id
        >;

  constructor(
    @inject('datasources.mongoDS') dataSource: MongoDsDataSource, @repository.getter('PossuiRepository') protected possuiRepositoryGetter: Getter<PossuiRepository>, @repository.getter('ComandoRepository') protected comandoRepositoryGetter: Getter<ComandoRepository>,
  ) {
    super(Hardware, dataSource);
    this.hardwareComandos = this.createHasManyThroughRepositoryFactoryFor('hardwareComandos', comandoRepositoryGetter, possuiRepositoryGetter,);
    this.registerInclusionResolver('hardwareComandos', this.hardwareComandos.inclusionResolver);
  }
}

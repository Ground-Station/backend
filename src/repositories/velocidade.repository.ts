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

  public calculaVelocidade(altitude_final: number, tempo_inicial: Date) {
    
    const moment = require('moment');
    const math = require('mathjs');
    
    let final = moment('2013-02-08 09:30:26')
    let inicial = moment(tempo_inicial)
    let intervalo = moment.duration(final.diff(inicial))

    let scope = {
      altitude: altitude_final,
      tempo: intervalo.asSeconds()
    }

    return math.evaluate('altitude/tempo',scope)
  }



}

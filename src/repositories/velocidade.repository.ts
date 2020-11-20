import {DefaultCrudRepository} from '@loopback/repository';
import {Velocidade, VelocidadeRelations} from '../models';
import {MongoDsDataSource} from '../datasources';
import {inject} from '@loopback/core';
import * as moment from 'moment'




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

  public calculaVelocidade(altitude_inical: number, altitude_final: number, tempo_inicial: Date, tempo_final: Date) {
    
    let inicial = tempo_inicial.fn.toString()
    let time_variation =  moment.duration(tempo_final.diff())
      return (altitude_final - altitude_inical) / 
  }



}

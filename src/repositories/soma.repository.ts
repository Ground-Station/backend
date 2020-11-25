import {DATE, DefaultCrudRepository} from '@loopback/repository';
import {Soma, SomaRelations} from '../models';
import {MongoDsDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class SomaRepository extends DefaultCrudRepository<
  Soma,
  typeof Soma.prototype.id,
  SomaRelations
> {
  constructor(
    @inject('datasources.mongoDS') dataSource: MongoDsDataSource,
  ) {
    super(Soma, dataSource);
  }

  

  public soma(num1:number,num2:number) {

    const math = require('mathjs');
    const moment = require('moment');

    // let scope = {
    //   altitude: 2 ,
    //   tempo: moment.duration(moment.diff(2))
    // }

    return math.evaluate('2/2')
  }
}

import {DefaultCrudRepository} from '@loopback/repository';
import {Serial, SerialRelations} from '../models';
import {MongoDsDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class SerialRepository extends DefaultCrudRepository<
  Serial,
  typeof Serial.prototype.id,
  SerialRelations
> {
  constructor(
    @inject('datasources.mongoDS') dataSource: MongoDsDataSource,
  ) {
    super(Serial, dataSource);
  }


  public comunicacaoSerial(baudRate:number) {
    
    const SerialPort = require('serialport')
    const Delimiter = require('@serialport/parser-delimiter')
    const port = new SerialPort('/dev/tty-usbserial1', {
      baudRate: baudRate
    })

    const parser = port.pipe(new Delimiter({ delimiter: ',' }))
    
    return parser.on('data', console.log) 
  }


}

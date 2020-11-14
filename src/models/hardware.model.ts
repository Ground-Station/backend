import {Entity, model, property} from '@loopback/repository';

@model()
export class Hardware extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  nomeHardware: string;

  @property({
    type: 'number',
    required: true,
  })
  baudRate: number;

  @property({
    type: 'string',
    required: true,
  })
  portaSerial: string;


  constructor(data?: Partial<Hardware>) {
    super(data);
  }
}

export interface HardwareRelations {
  // describe navigational properties here
}

export type HardwareWithRelations = Hardware & HardwareRelations;

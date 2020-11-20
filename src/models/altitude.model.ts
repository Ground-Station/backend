import {Entity, model, property} from '@loopback/repository';

@model()
export class Altitude extends Entity {
  @property({
    type: 'number',
    required: true,
  })
  altitude: number;

  @property({
    type: 'date',
    required: true,
  })
  tempo: string;

  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;


  constructor(data?: Partial<Altitude>) {
    super(data);
  }
}

export interface AltitudeRelations {
  // describe navigational properties here
}

export type AltitudeWithRelations = Altitude & AltitudeRelations;

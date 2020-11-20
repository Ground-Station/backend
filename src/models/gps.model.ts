import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class Gps extends Entity {
  @property({
    type: 'number',
    required: true,
  })
  latitude: number;

  @property({
    type: 'number',
    required: true,
  })
  longitude: number;

  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Gps>) {
    super(data);
  }
}

export interface GpsRelations {
  // describe navigational properties here
}

export type GpsWithRelations = Gps & GpsRelations;

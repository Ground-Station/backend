import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class Serial extends Entity {
  @property({
    type: 'string',
    required: true,
  })
  latitude: string;

  @property({
    type: 'string',
    required: true,
  })
  longitude: string;

  @property({
    type: 'string',
    required: true,
  })
  temperatura: string;

  @property({
    type: 'string',
    required: true,
  })
  pressao: string;

  @property({
    type: 'string',
    required: true,
  })
  altitude: string;

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

  constructor(data?: Partial<Serial>) {
    super(data);
  }
}

export interface SerialRelations {
  // describe navigational properties here
}

export type SerialWithRelations = Serial & SerialRelations;

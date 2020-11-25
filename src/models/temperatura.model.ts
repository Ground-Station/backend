import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class Temperatura extends Entity {
  @property({
    type: 'number',
    required: true,
  })
  temperatura: number;

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

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Temperatura>) {
    super(data);
  }
}

export interface TemperaturaRelations {
  // describe navigational properties here
}

export type TemperaturaWithRelations = Temperatura & TemperaturaRelations;

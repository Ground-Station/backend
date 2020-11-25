import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class Soma extends Entity {
  @property({
    type: 'number',
    required: true,
  })
  num1: number;

  @property({
    type: 'number',
    required: true,
  })
  num2: number;

  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  _id?: number;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Soma>) {
    super(data);
  }
}

export interface SomaRelations {
  // describe navigational properties here
}

export type SomaWithRelations = Soma & SomaRelations;

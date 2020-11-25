import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class Velocidade extends Entity {
  @property({
    type: 'number',
    required: true,
  })
  velocidade: number;

  @property({
    type: 'number',
    required: true,
  })
  tempo: number;

  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Velocidade>) {
    super(data);
  }
}

export interface VelocidadeRelations {
  // describe navigational properties here
}

export type VelocidadeWithRelations = Velocidade & VelocidadeRelations;

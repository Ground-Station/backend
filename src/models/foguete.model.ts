import {Entity, model, property} from '@loopback/repository';

@model({})
export class Foguete extends Entity {
  @property({
    type: 'string',
    required: true,
  })
  nome: string;

  @property({
    type: 'number',
    required: true,
  })
  pesoVazio: number;

  @property({
    type: 'number',
    required: true,
  })
  pesoCheio: number;

  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;


  constructor(data?: Partial<Foguete>) {
    super(data);
  }
}

export interface FogueteRelations {
  // describe navigational properties here
}

export type FogueteWithRelations = Foguete & FogueteRelations;

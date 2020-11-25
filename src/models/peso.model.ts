import {Entity, model, property} from '@loopback/repository';

@model()
export class Peso extends Entity {
  @property({
    type: 'number',
    required: true,
  })
  peso: number;

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


  constructor(data?: Partial<Peso>) {
    super(data);
  }
}

export interface PesoRelations {
  // describe navigational properties here
}

export type PesoWithRelations = Peso & PesoRelations;

import {Entity, model, property} from '@loopback/repository';

@model()
export class Missao extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'number',
    required: true,
  })
  apogeuEsperado: number;

  @property({
    type: 'string',
    required: true,
  })
  nomeMissao: string;


  constructor(data?: Partial<Missao>) {
    super(data);
  }
}

export interface MissaoRelations {
  // describe navigational properties here
}

export type MissaoWithRelations = Missao & MissaoRelations;

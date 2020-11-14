import {Entity, model, property} from '@loopback/repository';

@model()
export class Comando extends Entity {
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
  nome: string;

  @property({
    type: 'number',
    required: true,
  })
  valor: number;


  constructor(data?: Partial<Comando>) {
    super(data);
  }
}

export interface ComandoRelations {
  // describe navigational properties here
}

export type ComandoWithRelations = Comando & ComandoRelations;

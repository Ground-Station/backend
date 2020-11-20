import {Entity, model, property} from '@loopback/repository';

@model()
export class Pressao extends Entity {
  @property({
    type: 'number',
    required: true,
  })
  pressao: number;

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


  constructor(data?: Partial<Pressao>) {
    super(data);
  }
}

export interface PressaoRelations {
  // describe navigational properties here
}

export type PressaoWithRelations = Pressao & PressaoRelations;

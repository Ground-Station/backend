import {Entity, model, property} from '@loopback/repository';

@model()
export class Possui extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
  })
  hardwareId?: string;

  @property({
    type: 'string',
  })
  comandoId?: string;

  constructor(data?: Partial<Possui>) {
    super(data);
  }
}

export interface PossuiRelations {
  // describe navigational properties here
}

export type PossuiWithRelations = Possui & PossuiRelations;

import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
  import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
Hardware,
Possui,
Comando,
} from '../models';
import {HardwareRepository} from '../repositories';

export class HardwareComandoController {
  constructor(
    @repository(HardwareRepository) protected hardwareRepository: HardwareRepository,
  ) { }

  @get('/hardware/{id}/comandos', {
    responses: {
      '200': {
        description: 'Array of Hardware has many Comando through Possui',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Comando)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Comando>,
  ): Promise<Comando[]> {
    return this.hardwareRepository.hardwareComandos(id).find(filter);
  }

  @post('/hardware/{id}/comandos', {
    responses: {
      '200': {
        description: 'create a Comando model instance',
        content: {'application/json': {schema: getModelSchemaRef(Comando)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Hardware.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Comando, {
            title: 'NewComandoInHardware',
            exclude: ['id'],
          }),
        },
      },
    }) comando: Omit<Comando, 'id'>,
  ): Promise<Comando> {
    return this.hardwareRepository.hardwareComandos(id).create(comando);
  }

  @patch('/hardware/{id}/comandos', {
    responses: {
      '200': {
        description: 'Hardware.Comando PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Comando, {partial: true}),
        },
      },
    })
    comando: Partial<Comando>,
    @param.query.object('where', getWhereSchemaFor(Comando)) where?: Where<Comando>,
  ): Promise<Count> {
    return this.hardwareRepository.hardwareComandos(id).patch(comando, where);
  }

  @del('/hardware/{id}/comandos', {
    responses: {
      '200': {
        description: 'Hardware.Comando DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Comando)) where?: Where<Comando>,
  ): Promise<Count> {
    return this.hardwareRepository.hardwareComandos(id).delete(where);
  }
}

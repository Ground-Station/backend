import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
} from '@loopback/rest';
import {Comando} from '../models';
import {ComandoRepository} from '../repositories';

export class ComandoController {
  constructor(
    @repository(ComandoRepository)
    public comandoRepository : ComandoRepository,
  ) {}

  @post('/comandos', {
    responses: {
      '200': {
        description: 'Comando model instance',
        content: {'application/json': {schema: getModelSchemaRef(Comando)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Comando, {
            title: 'NewComando',
            exclude: ['id'],
          }),
        },
      },
    })
    comando: Omit<Comando, 'id'>,
  ): Promise<Comando> {
    return this.comandoRepository.create(comando);
  }

  @get('/comandos/count', {
    responses: {
      '200': {
        description: 'Comando model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(Comando) where?: Where<Comando>,
  ): Promise<Count> {
    return this.comandoRepository.count(where);
  }

  @get('/comandos', {
    responses: {
      '200': {
        description: 'Array of Comando model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Comando, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Comando) filter?: Filter<Comando>,
  ): Promise<Comando[]> {
    return this.comandoRepository.find(filter);
  }

  @patch('/comandos', {
    responses: {
      '200': {
        description: 'Comando PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Comando, {partial: true}),
        },
      },
    })
    comando: Comando,
    @param.where(Comando) where?: Where<Comando>,
  ): Promise<Count> {
    return this.comandoRepository.updateAll(comando, where);
  }

  @get('/comandos/{id}', {
    responses: {
      '200': {
        description: 'Comando model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Comando, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Comando, {exclude: 'where'}) filter?: FilterExcludingWhere<Comando>
  ): Promise<Comando> {
    return this.comandoRepository.findById(id, filter);
  }

  @patch('/comandos/{id}', {
    responses: {
      '204': {
        description: 'Comando PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Comando, {partial: true}),
        },
      },
    })
    comando: Comando,
  ): Promise<void> {
    await this.comandoRepository.updateById(id, comando);
  }

  @put('/comandos/{id}', {
    responses: {
      '204': {
        description: 'Comando PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() comando: Comando,
  ): Promise<void> {
    await this.comandoRepository.replaceById(id, comando);
  }

  @del('/comandos/{id}', {
    responses: {
      '204': {
        description: 'Comando DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.comandoRepository.deleteById(id);
  }
}

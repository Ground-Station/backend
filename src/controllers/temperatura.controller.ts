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
import {Temperatura} from '../models';
import {TemperaturaRepository} from '../repositories';

export class TemperaturaController {
  constructor(
    @repository(TemperaturaRepository)
    public temperaturaRepository : TemperaturaRepository,
  ) {}

  @post('/temperaturas', {
    responses: {
      '200': {
        description: 'Temperatura model instance',
        content: {'application/json': {schema: getModelSchemaRef(Temperatura)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Temperatura, {
            title: 'NewTemperatura',
            exclude: ['id'],
          }),
        },
      },
    })
    temperatura: Omit<Temperatura, 'id'>,
  ): Promise<Temperatura> {
    return this.temperaturaRepository.create(temperatura);
  }

  @get('/temperaturas/count', {
    responses: {
      '200': {
        description: 'Temperatura model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(Temperatura) where?: Where<Temperatura>,
  ): Promise<Count> {
    return this.temperaturaRepository.count(where);
  }

  @get('/temperaturas', {
    responses: {
      '200': {
        description: 'Array of Temperatura model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Temperatura, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Temperatura) filter?: Filter<Temperatura>,
  ): Promise<Temperatura[]> {
    return this.temperaturaRepository.find(filter);
  }

  @patch('/temperaturas', {
    responses: {
      '200': {
        description: 'Temperatura PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Temperatura, {partial: true}),
        },
      },
    })
    temperatura: Temperatura,
    @param.where(Temperatura) where?: Where<Temperatura>,
  ): Promise<Count> {
    return this.temperaturaRepository.updateAll(temperatura, where);
  }

  @get('/temperaturas/{id}', {
    responses: {
      '200': {
        description: 'Temperatura model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Temperatura, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Temperatura, {exclude: 'where'}) filter?: FilterExcludingWhere<Temperatura>
  ): Promise<Temperatura> {
    return this.temperaturaRepository.findById(id, filter);
  }

  @patch('/temperaturas/{id}', {
    responses: {
      '204': {
        description: 'Temperatura PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Temperatura, {partial: true}),
        },
      },
    })
    temperatura: Temperatura,
  ): Promise<void> {
    await this.temperaturaRepository.updateById(id, temperatura);
  }

  @put('/temperaturas/{id}', {
    responses: {
      '204': {
        description: 'Temperatura PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() temperatura: Temperatura,
  ): Promise<void> {
    await this.temperaturaRepository.replaceById(id, temperatura);
  }

  @del('/temperaturas/{id}', {
    responses: {
      '204': {
        description: 'Temperatura DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.temperaturaRepository.deleteById(id);
  }
}

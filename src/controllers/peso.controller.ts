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
import {Peso} from '../models';
import {PesoRepository} from '../repositories';

export class PesoController {
  constructor(
    @repository(PesoRepository)
    public pesoRepository : PesoRepository,
  ) {}

  @post('/pesos', {
    responses: {
      '200': {
        description: 'Peso model instance',
        content: {'application/json': {schema: getModelSchemaRef(Peso)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Peso, {
            title: 'NewPeso',
            exclude: ['id'],
          }),
        },
      },
    })
    peso: Omit<Peso, 'id'>,
  ): Promise<Peso> {
    return this.pesoRepository.create(peso);
  }

  @get('/pesos/count', {
    responses: {
      '200': {
        description: 'Peso model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(Peso) where?: Where<Peso>,
  ): Promise<Count> {
    return this.pesoRepository.count(where);
  }

  @get('/pesos', {
    responses: {
      '200': {
        description: 'Array of Peso model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Peso, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Peso) filter?: Filter<Peso>,
  ): Promise<Peso[]> {
    return this.pesoRepository.find(filter);
  }

  @patch('/pesos', {
    responses: {
      '200': {
        description: 'Peso PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Peso, {partial: true}),
        },
      },
    })
    peso: Peso,
    @param.where(Peso) where?: Where<Peso>,
  ): Promise<Count> {
    return this.pesoRepository.updateAll(peso, where);
  }

  @get('/pesos/{id}', {
    responses: {
      '200': {
        description: 'Peso model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Peso, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Peso, {exclude: 'where'}) filter?: FilterExcludingWhere<Peso>
  ): Promise<Peso> {
    return this.pesoRepository.findById(id, filter);
  }

  @patch('/pesos/{id}', {
    responses: {
      '204': {
        description: 'Peso PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Peso, {partial: true}),
        },
      },
    })
    peso: Peso,
  ): Promise<void> {
    await this.pesoRepository.updateById(id, peso);
  }

  @put('/pesos/{id}', {
    responses: {
      '204': {
        description: 'Peso PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() peso: Peso,
  ): Promise<void> {
    await this.pesoRepository.replaceById(id, peso);
  }

  @del('/pesos/{id}', {
    responses: {
      '204': {
        description: 'Peso DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.pesoRepository.deleteById(id);
  }
}

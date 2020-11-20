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
import {Velocidade} from '../models';
import {VelocidadeRepository} from '../repositories';

export class VelocidadeController {
  constructor(
    @repository(VelocidadeRepository)
    public velocidadeRepository : VelocidadeRepository,
  ) {}

  @post('/velocidades', {
    responses: {
      '200': {
        description: 'Velocidade model instance',
        content: {'application/json': {schema: getModelSchemaRef(Velocidade)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Velocidade, {
            title: 'NewVelocidade',
            exclude: ['id'],
          }),
        },
      },
    })
    velocidade: Omit<Velocidade, 'id'>,
  ): Promise<Velocidade> {
    return this.velocidadeRepository.create(velocidade);
  }

  @get('/velocidades/count', {
    responses: {
      '200': {
        description: 'Velocidade model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(Velocidade) where?: Where<Velocidade>,
  ): Promise<Count> {
    return this.velocidadeRepository.count(where);
  }

  @get('/velocidades', {
    responses: {
      '200': {
        description: 'Array of Velocidade model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Velocidade, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Velocidade) filter?: Filter<Velocidade>,
  ): Promise<Velocidade[]> {
    return this.velocidadeRepository.find(filter);
  }

  @patch('/velocidades', {
    responses: {
      '200': {
        description: 'Velocidade PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Velocidade, {partial: true}),
        },
      },
    })
    velocidade: Velocidade,
    @param.where(Velocidade) where?: Where<Velocidade>,
  ): Promise<Count> {
    return this.velocidadeRepository.updateAll(velocidade, where);
  }

  @get('/velocidades/{id}', {
    responses: {
      '200': {
        description: 'Velocidade model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Velocidade, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Velocidade, {exclude: 'where'}) filter?: FilterExcludingWhere<Velocidade>
  ): Promise<Velocidade> {
    return this.velocidadeRepository.findById(id, filter);
  }

  @patch('/velocidades/{id}', {
    responses: {
      '204': {
        description: 'Velocidade PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Velocidade, {partial: true}),
        },
      },
    })
    velocidade: Velocidade,
  ): Promise<void> {
    await this.velocidadeRepository.updateById(id, velocidade);
  }

  @put('/velocidades/{id}', {
    responses: {
      '204': {
        description: 'Velocidade PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() velocidade: Velocidade,
  ): Promise<void> {
    await this.velocidadeRepository.replaceById(id, velocidade);
  }

  @del('/velocidades/{id}', {
    responses: {
      '204': {
        description: 'Velocidade DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.velocidadeRepository.deleteById(id);
  }
}

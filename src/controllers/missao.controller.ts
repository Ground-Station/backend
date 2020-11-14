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
import {Missao} from '../models';
import {MissaoRepository} from '../repositories';

export class MissaoController {
  constructor(
    @repository(MissaoRepository)
    public missaoRepository : MissaoRepository,
  ) {}

  @post('/missoes', {
    responses: {
      '200': {
        description: 'Missao model instance',
        content: {'application/json': {schema: getModelSchemaRef(Missao)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Missao, {
            title: 'NewMissao',
            exclude: ['id'],
          }),
        },
      },
    })
    missao: Omit<Missao, 'id'>,
  ): Promise<Missao> {
    return this.missaoRepository.create(missao);
  }

  @get('/missoes/count', {
    responses: {
      '200': {
        description: 'Missao model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(Missao) where?: Where<Missao>,
  ): Promise<Count> {
    return this.missaoRepository.count(where);
  }

  @get('/missoes', {
    responses: {
      '200': {
        description: 'Array of Missao model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Missao, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Missao) filter?: Filter<Missao>,
  ): Promise<Missao[]> {
    return this.missaoRepository.find(filter);
  }

  @patch('/missoes', {
    responses: {
      '200': {
        description: 'Missao PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Missao, {partial: true}),
        },
      },
    })
    missao: Missao,
    @param.where(Missao) where?: Where<Missao>,
  ): Promise<Count> {
    return this.missaoRepository.updateAll(missao, where);
  }

  @get('/missoes/{id}', {
    responses: {
      '200': {
        description: 'Missao model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Missao, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Missao, {exclude: 'where'}) filter?: FilterExcludingWhere<Missao>
  ): Promise<Missao> {
    return this.missaoRepository.findById(id, filter);
  }

  @patch('/missoes/{id}', {
    responses: {
      '204': {
        description: 'Missao PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Missao, {partial: true}),
        },
      },
    })
    missao: Missao,
  ): Promise<void> {
    await this.missaoRepository.updateById(id, missao);
  }

  @put('/missoes/{id}', {
    responses: {
      '204': {
        description: 'Missao PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() missao: Missao,
  ): Promise<void> {
    await this.missaoRepository.replaceById(id, missao);
  }

  @del('/missoes/{id}', {
    responses: {
      '204': {
        description: 'Missao DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.missaoRepository.deleteById(id);
  }
}

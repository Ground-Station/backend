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
import {Pressao} from '../models';
import {PressaoRepository} from '../repositories';

export class PressaoController {
  constructor(
    @repository(PressaoRepository)
    public pressaoRepository : PressaoRepository,
  ) {}

  @post('/pressaos', {
    responses: {
      '200': {
        description: 'Pressao model instance',
        content: {'application/json': {schema: getModelSchemaRef(Pressao)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Pressao, {
            title: 'NewPressao',
            exclude: ['id'],
          }),
        },
      },
    })
    pressao: Omit<Pressao, 'id'>,
  ): Promise<Pressao> {
    return this.pressaoRepository.create(pressao);
  }

  @get('/pressaos/count', {
    responses: {
      '200': {
        description: 'Pressao model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(Pressao) where?: Where<Pressao>,
  ): Promise<Count> {
    return this.pressaoRepository.count(where);
  }

  @get('/pressaos', {
    responses: {
      '200': {
        description: 'Array of Pressao model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Pressao, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Pressao) filter?: Filter<Pressao>,
  ): Promise<Pressao[]> {
    return this.pressaoRepository.find(filter);
  }

  @patch('/pressaos', {
    responses: {
      '200': {
        description: 'Pressao PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Pressao, {partial: true}),
        },
      },
    })
    pressao: Pressao,
    @param.where(Pressao) where?: Where<Pressao>,
  ): Promise<Count> {
    return this.pressaoRepository.updateAll(pressao, where);
  }

  @get('/pressaos/{id}', {
    responses: {
      '200': {
        description: 'Pressao model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Pressao, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Pressao, {exclude: 'where'}) filter?: FilterExcludingWhere<Pressao>
  ): Promise<Pressao> {
    return this.pressaoRepository.findById(id, filter);
  }

  @patch('/pressaos/{id}', {
    responses: {
      '204': {
        description: 'Pressao PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Pressao, {partial: true}),
        },
      },
    })
    pressao: Pressao,
  ): Promise<void> {
    await this.pressaoRepository.updateById(id, pressao);
  }

  @put('/pressaos/{id}', {
    responses: {
      '204': {
        description: 'Pressao PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() pressao: Pressao,
  ): Promise<void> {
    await this.pressaoRepository.replaceById(id, pressao);
  }

  @del('/pressaos/{id}', {
    responses: {
      '204': {
        description: 'Pressao DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.pressaoRepository.deleteById(id);
  }
}

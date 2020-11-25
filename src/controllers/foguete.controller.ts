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
import {Foguete} from '../models';
import {FogueteRepository} from '../repositories';

export class FogueteController {
  constructor(
    @repository(FogueteRepository)
    public fogueteRepository : FogueteRepository,
  ) {}

  @post('/foguetes', {
    responses: {
      '200': {
        description: 'Foguete model instance',
        content: {'application/json': {schema: getModelSchemaRef(Foguete)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Foguete, {
            title: 'NewFoguete',
            exclude: ['id'],
          }),
        },
      },
    })
    foguete: Omit<Foguete, 'id'>,
  ): Promise<Foguete> {
    return this.fogueteRepository.create(foguete);
  }

  @get('/foguetes/count', {
    responses: {
      '200': {
        description: 'Foguete model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(Foguete) where?: Where<Foguete>,
  ): Promise<Count> {
    return this.fogueteRepository.count(where);
  }

  @get('/foguetes', {
    responses: {
      '200': {
        description: 'Array of Foguete model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Foguete, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Foguete) filter?: Filter<Foguete>,
  ): Promise<Foguete[]> {
    return this.fogueteRepository.find(filter);
  }

  @patch('/foguetes', {
    responses: {
      '200': {
        description: 'Foguete PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Foguete, {partial: true}),
        },
      },
    })
    foguete: Foguete,
    @param.where(Foguete) where?: Where<Foguete>,
  ): Promise<Count> {
    return this.fogueteRepository.updateAll(foguete, where);
  }

  @get('/foguetes/{id}', {
    responses: {
      '200': {
        description: 'Foguete model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Foguete, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Foguete, {exclude: 'where'}) filter?: FilterExcludingWhere<Foguete>
  ): Promise<Foguete> {
    return this.fogueteRepository.findById(id, filter);
  }

  @patch('/foguetes/{id}', {
    responses: {
      '204': {
        description: 'Foguete PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Foguete, {partial: true}),
        },
      },
    })
    foguete: Foguete,
  ): Promise<void> {
    await this.fogueteRepository.updateById(id, foguete);
  }

  @put('/foguetes/{id}', {
    responses: {
      '204': {
        description: 'Foguete PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() foguete: Foguete,
  ): Promise<void> {
    await this.fogueteRepository.replaceById(id, foguete);
  }

  @del('/foguetes/{id}', {
    responses: {
      '204': {
        description: 'Foguete DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.fogueteRepository.deleteById(id);
  }
}

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
import {Soma} from '../models';
import {SomaRepository} from '../repositories';

export class SomaController {
  constructor(
    @repository(SomaRepository)
    public somaRepository : SomaRepository,
  ) {}

  @post('/somas', {
    responses: {
      '200': {
        description: 'Soma model instance',
        content: {'application/json': {schema: getModelSchemaRef(Soma)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Soma, {
            title: 'NewSoma',
            exclude: ['id'],
          }),
        },
      },
    })
    soma: Omit<Soma, 'id'>,
  ): Promise<Soma> {
    return this.somaRepository.create(soma);
  }

  @get('/somas/count', {
    responses: {
      '200': {
        description: 'Soma model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(Soma) where?: Where<Soma>,
  ): Promise<Count> {
    return this.somaRepository.count(where);
  }

  @get('/somas/{id}/conta', {
    responses: {
      '200': {
        description: 'Realizar a soma',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Soma, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async conta(
    @param.path.string('id') id: string,
  ): Promise <Number>{
    
    let soma: Soma = await this.somaRepository.findById(id);
    let resultado : number;

    resultado = await this.somaRepository.soma(soma.num1,soma.num2);
    return resultado;
  }

  @patch('/somas', {
    responses: {
      '200': {
        description: 'Soma PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Soma, {partial: true}),
        },
      },
    })
    soma: Soma,
    @param.where(Soma) where?: Where<Soma>,
  ): Promise<Count> {
    return this.somaRepository.updateAll(soma, where);
  }

  @get('/somas/{id}', {
    responses: {
      '200': {
        description: 'Soma model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Soma, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Soma, {exclude: 'where'}) filter?: FilterExcludingWhere<Soma>
  ): Promise<Soma> {
    return this.somaRepository.findById(id, filter);
  }

  @patch('/somas/{id}', {
    responses: {
      '204': {
        description: 'Soma PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Soma, {partial: true}),
        },
      },
    })
    soma: Soma,
  ): Promise<void> {
    await this.somaRepository.updateById(id, soma);
  }

  @put('/somas/{id}', {
    responses: {
      '204': {
        description: 'Soma PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: string,
    @requestBody() soma: Soma,
  ): Promise<void> {
    await this.somaRepository.replaceById(id, soma);
  }

  @del('/somas/{id}', {
    responses: {
      '204': {
        description: 'Soma DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.somaRepository.deleteById(id);
  }
}

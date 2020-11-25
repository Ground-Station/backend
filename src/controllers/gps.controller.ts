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
import {Gps} from '../models';
import {GpsRepository} from '../repositories';

export class GpsController {
  constructor(
    @repository(GpsRepository)
    public gpsRepository : GpsRepository,
  ) {}

  @post('/gps', {
    responses: {
      '200': {
        description: 'Gps model instance',
        content: {'application/json': {schema: getModelSchemaRef(Gps)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Gps, {
            title: 'NewGps',
            exclude: ['id'],
          }),
        },
      },
    })
    gps: Omit<Gps, 'id'>,
  ): Promise<Gps> {
    return this.gpsRepository.create(gps);
  }

  @get('/gps/count', {
    responses: {
      '200': {
        description: 'Gps model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(Gps) where?: Where<Gps>,
  ): Promise<Count> {
    return this.gpsRepository.count(where);
  }

  @get('/gps', {
    responses: {
      '200': {
        description: 'Array of Gps model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Gps, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Gps) filter?: Filter<Gps>,
  ): Promise<Gps[]> {
    return this.gpsRepository.find(filter);
  }

  @patch('/gps', {
    responses: {
      '200': {
        description: 'Gps PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Gps, {partial: true}),
        },
      },
    })
    gps: Gps,
    @param.where(Gps) where?: Where<Gps>,
  ): Promise<Count> {
    return this.gpsRepository.updateAll(gps, where);
  }

  @get('/gps/{id}', {
    responses: {
      '200': {
        description: 'Gps model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Gps, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Gps, {exclude: 'where'}) filter?: FilterExcludingWhere<Gps>
  ): Promise<Gps> {
    return this.gpsRepository.findById(id, filter);
  }

  @patch('/gps/{id}', {
    responses: {
      '204': {
        description: 'Gps PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Gps, {partial: true}),
        },
      },
    })
    gps: Gps,
  ): Promise<void> {
    await this.gpsRepository.updateById(id, gps);
  }

  @put('/gps/{id}', {
    responses: {
      '204': {
        description: 'Gps PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() gps: Gps,
  ): Promise<void> {
    await this.gpsRepository.replaceById(id, gps);
  }

  @del('/gps/{id}', {
    responses: {
      '204': {
        description: 'Gps DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.gpsRepository.deleteById(id);
  }
}

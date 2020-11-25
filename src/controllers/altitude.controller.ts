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
import {Altitude} from '../models';
import {AltitudeRepository} from '../repositories';

export class AltitudeController {
  constructor(
    @repository(AltitudeRepository)
    public altitudeRepository : AltitudeRepository,
  ) {}

  @post('/altitudes', {
    responses: {
      '200': {
        description: 'Altitude model instance',
        content: {'application/json': {schema: getModelSchemaRef(Altitude)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Altitude, {
            title: 'NewAltitude',
            exclude: ['id'],
          }),
        },
      },
    })
    altitude: Omit<Altitude, 'id'>,
  ): Promise<Altitude> {
    return this.altitudeRepository.create(altitude);
  }

  @get('/altitudes/count', {
    responses: {
      '200': {
        description: 'Altitude model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(Altitude) where?: Where<Altitude>,
  ): Promise<Count> {
    return this.altitudeRepository.count(where);
  }

  @get('/altitudes', {
    responses: {
      '200': {
        description: 'Array of Altitude model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Altitude, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Altitude) filter?: Filter<Altitude>,
  ): Promise<Altitude[]> {
    return this.altitudeRepository.find(filter);
  }

  @patch('/altitudes', {
    responses: {
      '200': {
        description: 'Altitude PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Altitude, {partial: true}),
        },
      },
    })
    altitude: Altitude,
    @param.where(Altitude) where?: Where<Altitude>,
  ): Promise<Count> {
    return this.altitudeRepository.updateAll(altitude, where);
  }

  @get('/altitudes/{id}', {
    responses: {
      '200': {
        description: 'Altitude model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Altitude, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Altitude, {exclude: 'where'}) filter?: FilterExcludingWhere<Altitude>
  ): Promise<Altitude> {
    return this.altitudeRepository.findById(id, filter);
  }

  @patch('/altitudes/{id}', {
    responses: {
      '204': {
        description: 'Altitude PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Altitude, {partial: true}),
        },
      },
    })
    altitude: Altitude,
  ): Promise<void> {
    await this.altitudeRepository.updateById(id, altitude);
  }

  @put('/altitudes/{id}', {
    responses: {
      '204': {
        description: 'Altitude PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() altitude: Altitude,
  ): Promise<void> {
    await this.altitudeRepository.replaceById(id, altitude);
  }

  @del('/altitudes/{id}', {
    responses: {
      '204': {
        description: 'Altitude DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.altitudeRepository.deleteById(id);
  }
}

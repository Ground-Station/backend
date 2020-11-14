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
import {Hardware} from '../models';
import {HardwareRepository} from '../repositories';

export class HardwareController {
  constructor(
    @repository(HardwareRepository)
    public hardwareRepository : HardwareRepository,
  ) {}

  @post('/hardware', {
    responses: {
      '200': {
        description: 'Hardware model instance',
        content: {'application/json': {schema: getModelSchemaRef(Hardware)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Hardware, {
            title: 'NewHardware',
            exclude: ['id'],
          }),
        },
      },
    })
    hardware: Omit<Hardware, 'id'>,
  ): Promise<Hardware> {
    return this.hardwareRepository.create(hardware);
  }

  @get('/hardware/count', {
    responses: {
      '200': {
        description: 'Hardware model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(Hardware) where?: Where<Hardware>,
  ): Promise<Count> {
    return this.hardwareRepository.count(where);
  }

  @get('/hardware', {
    responses: {
      '200': {
        description: 'Array of Hardware model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Hardware, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Hardware) filter?: Filter<Hardware>,
  ): Promise<Hardware[]> {
    return this.hardwareRepository.find(filter);
  }

  @patch('/hardware', {
    responses: {
      '200': {
        description: 'Hardware PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Hardware, {partial: true}),
        },
      },
    })
    hardware: Hardware,
    @param.where(Hardware) where?: Where<Hardware>,
  ): Promise<Count> {
    return this.hardwareRepository.updateAll(hardware, where);
  }

  @get('/hardware/{id}', {
    responses: {
      '200': {
        description: 'Hardware model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Hardware, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Hardware, {exclude: 'where'}) filter?: FilterExcludingWhere<Hardware>
  ): Promise<Hardware> {
    return this.hardwareRepository.findById(id, filter);
  }

  @patch('/hardware/{id}', {
    responses: {
      '204': {
        description: 'Hardware PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Hardware, {partial: true}),
        },
      },
    })
    hardware: Hardware,
  ): Promise<void> {
    await this.hardwareRepository.updateById(id, hardware);
  }

  @put('/hardware/{id}', {
    responses: {
      '204': {
        description: 'Hardware PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() hardware: Hardware,
  ): Promise<void> {
    await this.hardwareRepository.replaceById(id, hardware);
  }

  @del('/hardware/{id}', {
    responses: {
      '204': {
        description: 'Hardware DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.hardwareRepository.deleteById(id);
  }
}

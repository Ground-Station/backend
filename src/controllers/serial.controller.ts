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
import {Serial} from '../models';
import {SerialRepository} from '../repositories';

export class SerialController {
  constructor(
    @repository(SerialRepository)
    public serialRepository : SerialRepository,
  ) {}

  @post('/serials', {
    responses: {
      '200': {
        description: 'Serial model instance',
        content: {'application/json': {schema: getModelSchemaRef(Serial)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Serial, {
            title: 'NewSerial',
            exclude: ['id'],
          }),
        },
      },
    })
    serial: Omit<Serial, 'id'>,
  ): Promise<Serial> {
    return this.serialRepository.create(serial);
  }


  @get('/serials/{baudrate}', {
    responses: {
      '200': {
        description: 'Serial model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Serial, {includeRelations: true}),
          },
        },
      },
    },
  })
  async comunicacaoSerial(
    @param.path.string('baudrate') baudrate: number,
  ): Promise<String> {
    return this.serialRepository.comunicacaoSerial(baudrate)
  }
}

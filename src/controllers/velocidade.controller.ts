import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,

} from '@loopback/rest';
import {Velocidade} from '../models';
import {VelocidadeRepository} from '../repositories';

export class VelocidadeController {
  constructor(
    @repository(VelocidadeRepository)
    public velocidadeRepository : VelocidadeRepository,
  ) {}

  @get('/calculaVelocidade/{altitude}/{tempo}', {
    responses: {
      '200': {
        description: 'Calculate rocket velocity',
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
  async calculoVelocidade(
    @param.path.string('altitude') altitude: number,
    @param.path.string('tempo') tempo: Date,
  ): Promise<Number> {

    let resultado : number;

    resultado = await this.velocidadeRepository.calculaVelocidade(altitude,tempo)

    return resultado
  }

}

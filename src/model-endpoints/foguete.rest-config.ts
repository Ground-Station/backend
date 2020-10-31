import {ModelCrudRestApiConfig} from '@loopback/rest-crud';
import {Foguete} from '../models';

const config: ModelCrudRestApiConfig = {
  model: Foguete,
  pattern: 'CrudRest',
  dataSource: 'rethinkdb',
  basePath: '/foguetes',
};
module.exports = config;

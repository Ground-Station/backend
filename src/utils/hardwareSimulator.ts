import {CronJob} from '@loopback/cron';
import {GroundStationApplication} from '../application';
import {MongoDsDataSource} from '../datasources';
import {Altitude} from '../models/altitude.model';
import {Gps} from '../models/gps.model';
import {Pressao} from '../models/pressao.model';
import {Velocidade} from '../models/velocidade.model';
import {AltitudeRepository} from '../repositories/altitude.repository';
import {GpsRepository} from '../repositories/gps.repository';
import {PressaoRepository} from '../repositories/pressao.repository';
import {VelocidadeRepository} from '../repositories/velocidade.repository';
// import {Temperatura} from '../models/temperatura.model';
// import {TemperaturaRepository} from '../repositories/temperatura.repository';

const fs = require('fs');
const lineByLine = require('n-readlines');
const app = new GroundStationApplication();
const liner = new lineByLine('/home/node/app/src/utils/flightSimulation.txt');
var line = "";
var splittedLine;
var time;
// var latitude;
// var longitude;
// var temperature;
// var pressure;
// var height;
// var velocity;


// Create an cron job
export const job = new CronJob({
  cronTime: '*/5 * * * * *', // Every one second
  onTick: () => {
    line = liner.next().toString();
    splittedLine = line.split(",", 6);
    time = new Date();
    postGps(splittedLine[0], splittedLine[1], time);
    postTemperature(splittedLine[2], time);
    postPressure(splittedLine[3], time);
    postHeight(splittedLine[4], time);
    postVelocity(splittedLine[5], time);
  },
  start: true, // Start the job immediately
});

function postGps(latitudeValue, longitudeValue, time) {
  var latitude: number = +latitudeValue;
  var longitude: number = +longitudeValue;
  const gps = new Gps();
  const datasources = new MongoDsDataSource()
  const gpsRepository = new GpsRepository(datasources)
  gps.latitude = latitude;
  gps.longitude = longitude;
  gps.tempo = time;
  gpsRepository.create(gps);
}

function postTemperature(value, time) {
  var temperature: number = +value;
  // const temperatura = new Temperatura();
  // const datasources = new MongoDsDataSource()
  // const temperaturaRepository = new TemperaturaRepository(datasources)
  // temperatura.temperatura = temperature;
  // temperatura.tempo = time;
  // temperaturaRepository.create(temperatura);
}

function postPressure(value, time) {
  var pressure: number = +value;
  const pressao = new Pressao();
  const datasources = new MongoDsDataSource()
  const pressaoRepository = new PressaoRepository(datasources)
  pressao.pressao = pressure;
  pressao.tempo = time;
  pressaoRepository.create(pressao);
}
function postHeight(value, time) {
  var height: number = +value;
  const altitude = new Altitude();
  const datasources = new MongoDsDataSource()
  const altitudeRepository = new AltitudeRepository(datasources)
  altitude.altitude = height;
  altitude.tempo = time;
  altitudeRepository.create(altitude);
}
function postVelocity(value, time) {
  var velocity: number = +value;
  const velocidade = new Velocidade();
  const datasources = new MongoDsDataSource()
  const velocidadeRepository = new VelocidadeRepository(datasources)
  velocidade.velocidade = velocity;
  velocidade.tempo = time;
  velocidadeRepository.create(velocidade);
}

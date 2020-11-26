import {CronJob} from '@loopback/cron';
import {GroundStationApplication} from '../application';
import {PressaoRepository} from '../repositories/pressao.repository'
import {Pressao} from '../models/pressao.model'
import {MongoDsDataSource} from '../datasources';

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
  cronTime: '*/1 * * * * *', // Every one second
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
  var gpsJson = {"latitude": latitude, "longitude": longitude, "tempo": time};
  console.log(gpsJson);
}

function postTemperature(value, time) {
  var temperature: number = +value;
  var temperatureJson = {"temperatura": temperature, "tempo": time};
  console.log(temperatureJson);
}

function postPressure(value, time) {
  var pressure: number = +value;
  var pressureJson = {"pressao": pressure, "tempo": time};
  console.log(pressureJson);
  const pressao = new Pressao();
  const datasources = new MongoDsDataSource()
  const pressaoRepository = new PressaoRepository(datasources)
  pressao.pressao = pressure;
  pressao.tempo = time;
  pressaoRepository.create(pressao);
}
function postHeight(value, time) {
  var height: number = +value;
  var heightJson = {"altitude": height, "tempo": time};
  console.log(heightJson);
}
function postVelocity(value, time) {
  var velocity: number = +value;
  var velocityJson = {"velocidade": velocity, "tempo": time};
  console.log(velocityJson);
}

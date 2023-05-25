"use strict";
const SensorAbl = require("../../abl/sensor-abl.js");

class SensorController {

  sensorCreate(ucEnv) {
    return SensorAbl.sensorCreate(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

  sensorDelete(ucEnv) {
    return SensorAbl.sensorDelete(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

  sensorUpdate(ucEnv) {
    return SensorAbl.sensorUpdate(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

  sensorList(ucEnv) {
    return SensorAbl.sensorList(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

}

module.exports = new SensorController();

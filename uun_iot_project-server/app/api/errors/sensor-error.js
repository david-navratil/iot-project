"use strict";

const IotProjectUseCaseError = require("./iot-project-use-case-error.js");
const SENSOR_ERROR_PREFIX = `${IotProjectUseCaseError.ERROR_PREFIX}sensor/`;

const SensorList = {
  UC_CODE: `${SENSOR_ERROR_PREFIX}sensorList/`,
  
};

const SensorUpdate = {
  UC_CODE: `${SENSOR_ERROR_PREFIX}sensorUpdate/`,
  
};

const SensorDelete = {
  UC_CODE: `${SENSOR_ERROR_PREFIX}sensorDelete/`,
  
};

const SensorCreate = {
  UC_CODE: `${SENSOR_ERROR_PREFIX}sensorCreate/`,
  
};

module.exports = {
  SensorCreate,
  SensorDelete,
  SensorUpdate,
  SensorList
};

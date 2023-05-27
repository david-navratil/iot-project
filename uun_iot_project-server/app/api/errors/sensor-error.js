"use strict";

const IotProjectUseCaseError = require("./iot-project-use-case-error.js");
const SENSOR_ERROR_PREFIX = `${IotProjectUseCaseError.ERROR_PREFIX}sensor/`;

const SensorList = {
  UC_CODE: `${SENSOR_ERROR_PREFIX}sensorList/`,
  DaoListFailed: class extends IotProjectUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${SensorList.UC_CODE}daoFailed`;
      this.message = "List records from database failed.";
    }
  },
  InvalidDtoIn: class extends IotProjectUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${SensorCreate.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  }
};

const SensorUpdate = {
  UC_CODE: `${SENSOR_ERROR_PREFIX}sensorUpdate/`,
  InvalidId: class extends IotProjectUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${SensorUpdate.UC_CODE}invalidId`;
      this.message = "Sensor with given Id does not exists.";
    }
  },
  InvalidDtoIn: class extends IotProjectUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${SensorUpdate.UC_CODE}invalidDtoIn`;
      this.message = "Dto In is not valid.";
    }
  },
  SectionDaoUpdateFailed: class extends IotProjectUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${SensorUpdate.UC_CODE}daoFailed`;
      this.message = "Update record in database failed.";
    }
  },
};

const SensorDelete = {
  UC_CODE: `${SENSOR_ERROR_PREFIX}sensorDelete/`,
  InvalidId: class extends IotProjectUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${SensorDelete.UC_CODE}invalidId`;
      this.message = "Sensor with given Id does not exists.";
    }
  },
  SectionDaoDeleteFailed: class extends IotProjectUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${SensorDelete.UC_CODE}daoFailed`;
      this.message = "Delete record from database failed.";
    }
  },
};

const SensorCreate = {
  UC_CODE: `${SENSOR_ERROR_PREFIX}sensorCreate/`,
  InvalidDtoIn: class extends IotProjectUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${SensorCreate.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  }
};

module.exports = {
  SensorCreate,
  SensorDelete,
  SensorUpdate,
  SensorList
};

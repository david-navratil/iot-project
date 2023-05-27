"use strict";

const IotProjectUseCaseError = require("./iot-project-use-case-error.js");
const ALERT_HISTORY_ERROR_PREFIX = `${IotProjectUseCaseError.ERROR_PREFIX}alertHistory/`;

const AlertHistoryList = {
  UC_CODE: `${ALERT_HISTORY_ERROR_PREFIX}alertHistoryList/`,
  InvalidDtoIn: class extends IotProjectUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${AlertHistoryList.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
  AlertDaoListFailed: class extends IotProjectUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${AlertHistoryList.UC_CODE}daoFailed`;
      this.message = "List records from database failed.";
    }
  },
};

const AlertHistoryCreate = {
  UC_CODE: `${ALERT_HISTORY_ERROR_PREFIX}alertHistoryCreate/`,
  InvalidDtoIn: class extends IotProjectUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${AlertHistoryCreate.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
  InvalidSensorId: class extends IotProjectUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${AlertHistoryCreate.UC_CODE}invalidDtoIn`;
      this.message = "SensorId is not valid.";
    }
  },
};

module.exports = {
  AlertHistoryCreate,
  AlertHistoryList
};

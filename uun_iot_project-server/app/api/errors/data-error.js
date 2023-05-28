"use strict";

const IotProjectUseCaseError = require("./iot-project-use-case-error.js");
const DATA_ERROR_PREFIX = `${IotProjectUseCaseError.ERROR_PREFIX}data/`;

const DataList = {
  UC_CODE: `${DATA_ERROR_PREFIX}dataList/`,
  
};

const DataCreate = {
  UC_CODE: `${DATA_ERROR_PREFIX}dataCreate/`,
  
};

const DataCreateList = {
  UC_CODE: `${DATA_ERROR_PREFIX}dataCreateList/`,
  
};

module.exports = {
  DataCreateList,
  DataCreate,
  DataList
};

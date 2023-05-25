"use strict";

const IotProjectUseCaseError = require("./iot-project-use-case-error.js");
const ALERT_ERROR_PREFIX = `${IotProjectUseCaseError.ERROR_PREFIX}alert/`;

const AlertHistory = {
  UC_CODE: `${ALERT_ERROR_PREFIX}alertHistory/`,
  
};

const AlertList = {
  UC_CODE: `${ALERT_ERROR_PREFIX}alertList/`,
  
};

const AlertChecked = {
  UC_CODE: `${ALERT_ERROR_PREFIX}alertChecked/`,
  
};

const AlertDelete = {
  UC_CODE: `${ALERT_ERROR_PREFIX}alertDelete/`,
  
};

const AlertCreate = {
  UC_CODE: `${ALERT_ERROR_PREFIX}alertCreate/`,
  
};

module.exports = {
  AlertCreate,
  AlertDelete,
  AlertChecked,
  AlertList,
  AlertHistory
};

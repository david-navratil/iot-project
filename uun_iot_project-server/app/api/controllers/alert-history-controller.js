"use strict";
const AlertHistoryAbl = require("../../abl/alert-history-abl.js");

class AlertHistoryController {

  alertHistoryCreate(ucEnv) {
    return AlertHistoryAbl.alertHistoryCreate(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

  alertHistoryList(ucEnv) {
    return AlertHistoryAbl.alertHistoryList(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

}

module.exports = new AlertHistoryController();

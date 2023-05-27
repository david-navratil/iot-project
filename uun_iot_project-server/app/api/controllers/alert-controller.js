"use strict";
const AlertAbl = require("../../abl/alert-abl.js");

class AlertController {

  alertCreate(ucEnv) {
    return AlertAbl.alertCreate(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

  alertDelete(ucEnv) {
    return AlertAbl.alertDelete(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

  alertCheck(ucEnv) {
    return AlertAbl.alertCheck(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

  alertList(ucEnv) {
    return AlertAbl.alertList(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

}

module.exports = new AlertController();

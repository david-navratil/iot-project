"use strict";
const AlertAbl = require("../../abl/alert-abl.js");

class AlertController {

  alertCreate(ucEnv) {
    return AlertAbl.alertCreate(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

  alertDelete(ucEnv) {
    return AlertAbl.alertDelete(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

  alertChecked(ucEnv) {
    return AlertAbl.alertChecked(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

  alertList(ucEnv) {
    return AlertAbl.alertList(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

  alertHistory(ucEnv) {
    return AlertAbl.alertHistory(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

}

module.exports = new AlertController();

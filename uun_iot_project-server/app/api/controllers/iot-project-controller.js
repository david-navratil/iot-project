"use strict";
const IotProjectAbl = require("../../abl/iot-project-abl.js");

class IotProjectController {
  init(ucEnv) {
    return IotProjectAbl.init(ucEnv.getUri(), ucEnv.getDtoIn(), ucEnv.getSession());
  }

  load(ucEnv) {
    return IotProjectAbl.load(ucEnv.getUri(), ucEnv.getSession());
  }

  loadBasicData(ucEnv) {
    return IotProjectAbl.loadBasicData(ucEnv.getUri(), ucEnv.getSession());
  }
}

module.exports = new IotProjectController();

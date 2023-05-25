"use strict";
const DataAbl = require("../../abl/data-abl.js");

class DataController {

  dataCreate(ucEnv) {
    return DataAbl.dataCreate(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

  dataList(ucEnv) {
    return DataAbl.dataList(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

}

module.exports = new DataController();

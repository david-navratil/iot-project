"use strict";
const Path = require("path");
const { Validator } = require("uu_appg01_server").Validation;
const { DaoFactory } = require("uu_appg01_server").ObjectStore;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const AlertAbl = require("../abl/alert-abl.js");
const Errors = require("../api/errors/data-error.js");
const WARNINGS = {

};

class DataAbl {

  constructor() {
    this.validator = Validator.load();
    this.dao = DaoFactory.getDao("data");
  }

  async dataCreate(awid, dtoIn) {
    var alert = AlertAbl.alertCreate(awid, dtoIn);
    //{

    //}
    //
    //
    var i = 0;
  }

  async dataList(awid, dtoIn) {
    
  }

}

module.exports = new DataAbl();

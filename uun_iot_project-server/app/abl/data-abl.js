"use strict";
const Path = require("path");
const { Validator } = require("uu_appg01_server").Validation;
const { DaoFactory } = require("uu_appg01_server").ObjectStore;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const Errors = require("../api/errors/data-error.js");

const WARNINGS = {

};

class DataAbl {

  constructor() {
    this.validator = Validator.load();
    this.dao = DaoFactory.getDao("data");
  }

  async dataCreate(awid, dtoIn) {
    
  }

  async dataList(awid, dtoIn) {
    
  }

}

module.exports = new DataAbl();

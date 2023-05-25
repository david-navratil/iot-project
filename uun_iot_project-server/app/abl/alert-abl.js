"use strict";
const Path = require("path");
const { Validator } = require("uu_appg01_server").Validation;
const { DaoFactory } = require("uu_appg01_server").ObjectStore;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const Errors = require("../api/errors/alert-error.js");

const WARNINGS = {

};

class AlertAbl {

  constructor() {
    this.validator = Validator.load();
    this.dao = DaoFactory.getDao("alert");
  }

  async alertCreate(awid, dtoIn) {
    
  }

  async alertDelete(awid, dtoIn) {
    
  }

  async alertChecked(awid, dtoIn) {
    
  }

  async alertList(awid, dtoIn) {
    
  }

  async alertHistory(awid, dtoIn) {
    
  }

}

module.exports = new AlertAbl();

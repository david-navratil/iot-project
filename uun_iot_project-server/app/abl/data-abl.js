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
    this.daoAlert = DaoFactory.getDao("alert");
  }

  async dataCreate(awid, dtoIn) {
    let alertOld;
    let alertExists = false;
    let alertChanged = false;
    let alert;
    try {
      alertOld = await this.daoAlert.getBySensorId(awid, dtoIn.sensorId);
      if (alertOld !== null) {
        alertExists = true;
        alertChanged = alertOld.status != dtoIn.status ? true : false;
      }
    } catch (e) {
      if (e instanceof ObjectStoreError) {
        throw new Errors.DataCreate.DataDaoCreateFailed({ uuAppErrorMap }, e);
      }
    }
    if (alertChanged) {
      let removeObject = await this.daoAlert.getBySensorId(awid, dtoIn.sensorId);
      await this.daoAlert.remove(removeObject);
      let alertNew = {
        "sensorId": dtoIn.sensorId,
        "check": alertOld.check,
        "checkTime": alertOld.checkTime,
        "status": dtoIn.status,
        "switchTime": Date.now(),
        "awid": awid
      }
      alert = await AlertAbl.alertCreate(awid, alertNew);
    }
    else
    {
      let alertNew = {
        "sensorId": dtoIn.sensorId,
        "check": false,
        "checkTime": Date.now(),
        "status": dtoIn.status,
        "switchTime": Date.now(),
        "awid": awid
      }
      alert = await AlertAbl.alertCreate(awid, alertNew);
    }
    return alert;

    // const alertuuSchema = {
    //   id: "012...", //generated unique code
    //   sensorid: "01", // sensor ID
    //   check: false, // Checks if the situation was check personally
    //   checkTime: 2023-01-02T00:00:00Z, // Time when the user checks alert
    //   status: false, // checks if alert is currently active
    //   switchTime: Date
    //   awid: "012...", //app instance id - unique code specified externally
    //   sys: {
    //     cts: "...", //creation timestamp
    //       mts: "...", //modification timestamp
    //       rev: 0 //revision number
    //   },

    var i = 0;
  }

  async dataList(awid, dtoIn) {

  }

}

module.exports = new DataAbl();

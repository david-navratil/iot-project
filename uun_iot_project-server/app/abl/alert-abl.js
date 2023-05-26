"use strict";
const Path = require("path");
const { Validator } = require("uu_appg01_server").Validation;
const { DaoFactory, ObjectStoreError } = require("uu_appg01_server").ObjectStore;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const Errors = require("../api/errors/alert-error.js");


const WARNINGS = {
  initUnsupportedKeys: {
    code: `${Errors.AlertCreate.UC_CODE}unsupportedKeys`,
  },
};

const DEFAULTS = {
  sortBy: "name",
  order: "asc",
  pageIndex: 0,
  pageSize: 100,
};

class AlertAbl {

  constructor() {
    this.validator = Validator.load();
    this.dao = DaoFactory.getDao("alert");
    this.sensorDao = DaoFactory.getDao("sensor")
  }

  async alertCreate(awid, dtoIn) {
    // Input validation
    let uuAppErrorMap;
    const validationResult = this.validator.validate("alertCreateDtoInType", dtoIn);
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.initUnsupportedKeys.code,
      Errors.AlertCreate.InvalidDtoIn
    );

    let data = dtoIn
    if (!dtoIn.status) data.status = true
    data.checked = false
    data.checkTime = "0000-00-00T00:00:00Z"

    // Validate sensorId
    /*
    const sensor = this.sensorDao.get()
    if (!sensor) {
      throw new Errors.AlertCreate.InvalidSensorId({ uuAppErrorMap });
    }
     */

    // Send alert message
    /*
    const accountSid = "AC8cd5b3b51e5715756a64923d83ac4d9c";
    const authToken = "e26414ac7f6a65b1a80fa1d74d694284";
    const client = require("twilio")(accountSid, authToken);
    client.messages
      .create({ body: "Sensor " + sensor.name + " firing!", from: "+13158175434", to: "+420721614855" })
      .then(message => console.log(message.sid));
     */

    // Dao create
    data.awid = awid;
    let section = await this.dao.create(data);

    const dtoOut = {
      ...section,
      uuAppErrorMap,
    };

    return dtoOut
  }

  async alertDelete(awid, dtoIn) {
    let uuAppErrorMap;

    const validationResult = this.validator.validate("alertDeleteDtoInType", dtoIn);
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.initUnsupportedKeys.code,
      Errors.AlertDelete.InvalidDtoIn
    );

    try {
      let alert = await this.dao.get(awid, dtoIn.id);

      if (alert === null) {
        throw new Errors.AlertDelete.InvalidId({ uuAppErrorMap });
      }
      let data = dtoIn;
      data.awid = awid;
      await this.dao.remove(data);
    } catch (e) {
      if (e instanceof ObjectStoreError) {
        throw new Errors.AlertDelete.AlertDaoDeleteFailed({ uuAppErrorMap }, e);
      }
      throw e;
    }

    let dtoOut = { uuAppErrorMap: uuAppErrorMap, data: dtoIn };
    return dtoOut
  }

  async alertCheck(awid, dtoIn) {
    // Input validation
    let uuAppErrorMap;
    const validationResult = this.validator.validate("alertCheckDtoInType", dtoIn);
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.initUnsupportedKeys.code,
      Errors.AlertCheck.InvalidDtoIn
    );

    // Update alert
    let updatedAlert
    try {
      let alert = await this.dao.get(awid, dtoIn.id);
      if (alert === null) {
        throw new Errors.AlertCheck.InvalidId({ uuAppErrorMap });
      }

      alert.check = true
      updatedAlert = this.dao.update(alert)
    } catch (e) {
      if (e instanceof ObjectStoreError) {
        throw new Errors.AlertCheck.AlertDaoCheckFailed({ uuAppErrorMap }, e);
      }
      throw e;
    }

    const dtoOut = {
      ...updatedAlert,
      uuAppErrorMap,
    };

    return dtoOut
  }

  async alertList(awid, dtoIn) {
    // TODO filtr na status

    let uuAppErrorMap;

    const validationResult = this.validator.validate("sectionListDtoInType", dtoIn);
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.initUnsupportedKeys.code,
      Errors.AlertList.InvalidDtoIn
    );

    if (!dtoIn.sortBy) dtoIn.sortBy = DEFAULTS.sortBy;
    if (!dtoIn.order) dtoIn.order = DEFAULTS.order;
    if (!dtoIn.pageInfo) dtoIn.pageInfo = {};
    if (!dtoIn.pageInfo.pageSize) dtoIn.pageInfo.pageSize = DEFAULTS.pageSize;
    if (!dtoIn.pageInfo.pageIndex) dtoIn.pageInfo.pageIndex = DEFAULTS.pageIndex;
    if (!dtoIn.activeOnly) dtoIn.activeOnly = false;

    let list;
    try {
      list = await this.dao.list(awid, dtoIn.sortBy, dtoIn.order, dtoIn.pageInfo);
    } catch(e) {
      if (e instanceof ObjectStoreError) {
        throw new Errors.AlertList.DaoListFailed({ uuAppErrorMap }, e);
      }
      throw e;
    }

    const dtoOut = {
      ...list,
      uuAppErrorMap
    };
    return dtoOut
  }

}

module.exports = new AlertAbl();

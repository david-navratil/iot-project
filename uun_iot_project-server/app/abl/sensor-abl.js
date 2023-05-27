"use strict";
const Path = require("path");
const { Validator } = require("uu_appg01_server").Validation;
const { DaoFactory, ObjectStoreError } = require("uu_appg01_server").ObjectStore;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const Errors = require("../api/errors/sensor-error.js");

const WARNINGS = {
  initUnsupportedKeys: {
    code: `${Errors.SensorCreate.UC_CODE}unsupportedKeys`,
  },
};

const DEFAULTS = {
  sortBy: "name",
  order: "asc",
  pageIndex: 0,
  pageSize: 100,
};

class SensorAbl {

  constructor() {
    this.validator = Validator.load();
    this.dao = DaoFactory.getDao("sensor");
  }

  async sensorCreate(awid, dtoIn) {
    let uuAppErrorMap;
    const validationResult = this.validator.validate("sensorCreateDtoInType", dtoIn);
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
    validationResult,
      WARNINGS.initUnsupportedKeys.code,
      Errors.SensorCreate.InvalidDtoIn
  );

    let data = dtoIn

    // Dao create
    data.awid = awid;
    let sensor = await this.dao.create(data);

    const dtoOut = {
      ...sensor,
      uuAppErrorMap,
    };

    return dtoOut
  }

  async sensorDelete(awid, dtoIn) {
    let uuAppErrorMap;

    const validationResult = this.validator.validate("sensorDeleteDtoInType", dtoIn);
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.initUnsupportedKeys.code,
      Errors.SensorDelete.InvalidDtoIn
    );

    try {
      let subject = await this.dao.get(awid, dtoIn.sensorid);

      if (subject === null) {
        throw new Errors.SensorDelete.InvalidId({ uuAppErrorMap });
      }
      let data = dtoIn;
      data.awid = awid;
      await this.dao.remove(data);
    } catch (e) {
      if (e instanceof ObjectStoreError) {
        throw new Errors.SensorDelete.SensorDaoDeleteFailed({ uuAppErrorMap }, e);
      }
      throw e;
    }

    let dtoOut = { uuAppErrorMap: uuAppErrorMap, data: dtoIn };
    return dtoOut
  }

  async sensorUpdate(awid, dtoIn) {
    let uuAppErrorMap;
    const validationResult = this.validator.validate("sensorUpdateDtoInType", dtoIn);
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.initUnsupportedKeys.code,
      Errors.SensorUpdate.InvalidDtoIn
    );

    let sensor;
    try {
      sensor = await this.dao.get(awid, dtoIn.sensorid);
      if (sensor === null) {
        throw new Errors.SensorUpdate.InvalidId({ uuAppErrorMap });
      }
    } catch (e) {
      if (e instanceof ObjectStoreError) {
        throw new Errors.SensorUpdate.SensorDaoUpdateFailed({ uuAppErrorMap }, e);
      }
      throw e;
    }

    let data = dtoIn;

    let updatedObject
    try {
      data.awid = awid;
      updatedObject = await this.dao.update(data);
    } catch (e) {
      if (e instanceof ObjectStoreError) {
        throw new Errors.SensorUpdate.SensorDaoUpdateFailed({ uuAppErrorMap }, e);
      }
      throw e;
    }

    let dtoOut = { uuAppErrorMap: uuAppErrorMap, ...updatedObject };
    return dtoOut
  }

  async sensorList(awid, dtoIn) {
    let uuAppErrorMap;

    const validationResult = this.validator.validate("sensorListDtoInType", dtoIn);
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.initUnsupportedKeys.code,
      Errors.SensorList.InvalidDtoIn
    );
    
    if (!dtoIn.sortBy) dtoIn.sortBy = DEFAULTS.sortBy;
    if (!dtoIn.order) dtoIn.order = DEFAULTS.order;
    if (!dtoIn.pageInfo) dtoIn.pageInfo = {};
    if (!dtoIn.pageInfo.pageSize) dtoIn.pageInfo.pageSize = DEFAULTS.pageSize;
    if (!dtoIn.pageInfo.pageIndex) dtoIn.pageInfo.pageIndex = DEFAULTS.pageIndex;

    let list;
    try {
      list = await this.dao.list(awid, dtoIn.sortBy, dtoIn.order, dtoIn.pageInfo);
    } catch(e) {
      if (e instanceof ObjectStoreError) {
        throw new Errors.SensorList.DaoListFailed({ uuAppErrorMap }, e);
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

module.exports = new SensorAbl();

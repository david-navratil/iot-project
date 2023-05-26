"use strict";
const Path = require("path");
const { Validator } = require("uu_appg01_server").Validation;
const { DaoFactory, ObjectStoreError } = require("uu_appg01_server").ObjectStore;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const Errors = require("../api/errors/section-error.js");

const WARNINGS = {
  initUnsupportedKeys: {
    code: `${Errors.SectionCreate.UC_CODE}unsupportedKeys`,
  },
};

const DEFAULTS = {
  sortBy: "name",
  order: "asc",
  pageIndex: 0,
  pageSize: 100,
};

class SectionAbl {

  constructor() {
    this.validator = Validator.load();
    this.dao = DaoFactory.getDao("section");
  }

  async sectionCreate(awid, dtoIn) {

    // Input validation
    let uuAppErrorMap;
    const validationResult = this.validator.validate("sectionCreateDtoInType", dtoIn);
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
    validationResult,
      WARNINGS.initUnsupportedKeys.code,
      Errors.SectionCreate.InvalidDtoIn
  );

    let data = dtoIn

    if (!dtoIn.description) data.description = ""
    if (dtoIn.sensorIds) {
      // TODO Validate sensor IDs
      /*
      let idValidator = new IdValidator("topic");
      if (dtoIn.topicList !== undefined) {
        sensorIds = await idValidator.checkIdValid(awid, dtoIn.topicList);
        data.topicList = topics.existingEntities;
      }
       */
    } else {
      data.sensorIds = []
    }

    // Dao create
    data.awid = awid;
    let section = await this.dao.create(data);

    const dtoOut = {
      ...section,
      uuAppErrorMap,
    };

    return dtoOut
  }

  async sectionUpdate(awid, dtoIn) {
    let uuAppErrorMap;
    const validationResult = this.validator.validate("sectionUpdateDtoInType", dtoIn);
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.initUnsupportedKeys.code,
      Errors.SectionUpdate.InvalidDtoIn
    );

    let section;
    try {
      section = await this.dao.get(awid, dtoIn.id);
      if (section === null) {
        throw new Errors.SectionUpdate.InvalidId({ uuAppErrorMap });
      }
    } catch (e) {
      if (e instanceof ObjectStoreError) {
        throw new Errors.SectionUpdate.SectionDaoUpdateFailed({ uuAppErrorMap }, e);
      }
      throw e;
    }

    let data = dtoIn;

    if (dtoIn.sensorIds) {
      // TODO Validate sensor IDs
      /*
      let idValidator = new IdValidator("topic");
      if (dtoIn.topicList !== undefined) {
        sensorIds = await idValidator.checkIdValid(awid, dtoIn.topicList);
        data.topicList = topics.existingEntities;
      }
       */
    }

    let updatedObject
    try {
      data.awid = awid;
      updatedObject = await this.dao.update(data);
    } catch (e) {
      if (e instanceof ObjectStoreError) {
        throw new Errors.SectionUpdate.SectionDaoUpdateFailed({ uuAppErrorMap }, e);
      }
      throw e;
    }

    let dtoOut = { uuAppErrorMap: uuAppErrorMap, ...updatedObject };
    return dtoOut
  }

  async sectionList(awid, dtoIn) {
    let uuAppErrorMap;

    const validationResult = this.validator.validate("sectionListDtoInType", dtoIn);
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.initUnsupportedKeys.code,
      Errors.SectionCreate.InvalidDtoIn
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
        throw new Errors.SectionList.DaoListFailed({ uuAppErrorMap }, e);
      }
      throw e;
    }

    const dtoOut = {
      ...list,
      uuAppErrorMap
    };
    return dtoOut
  }

  async sectionDelete(awid, dtoIn) {
    let uuAppErrorMap;

    const validationResult = this.validator.validate("sectionDeleteDtoInType", dtoIn);
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.initUnsupportedKeys.code,
      Errors.SectionDelete.InvalidDtoIn
    );

    try {
      let subject = await this.dao.get(awid, dtoIn.id);

      if (subject === null) {
        throw new Errors.SectionDelete.InvalidId({ uuAppErrorMap });
      }
      let data = dtoIn;
      data.awid = awid;
      await this.dao.remove(data);
    } catch (e) {
      if (e instanceof ObjectStoreError) {
        throw new Errors.SectionDelete.SectionDaoDeleteFailed({ uuAppErrorMap }, e);
      }
      throw e;
    }

    let dtoOut = { uuAppErrorMap: uuAppErrorMap, data: dtoIn };
    return dtoOut
  }
}

module.exports = new SectionAbl();

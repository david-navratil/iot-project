"use strict";
const Path = require("path");
const { Validator } = require("uu_appg01_server").Validation;
const { DaoFactory } = require("uu_appg01_server").ObjectStore;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const Errors = require("../api/errors/alert-history-error.js");

const WARNINGS = {
  initUnsupportedKeys: {
    code: `${Errors.AlertHistoryCreate.UC_CODE}unsupportedKeys`,
  },
};

const DEFAULTS = {
  sortBy: "name",
  order: "asc",
  pageIndex: 0,
  pageSize: 100,
};
class AlertHistoryAbl {

  constructor() {
    this.validator = Validator.load();
    this.dao = DaoFactory.getDao("alertHistory");
  }

  async alertHistoryCreate(awid, dtoIn) {
        // Input validation
        let uuAppErrorMap;
        const validationResult = this.validator.validate("alertHistoryCreateDtoInType", dtoIn);
        uuAppErrorMap = ValidationHelper.processValidationResult(
          dtoIn,
          validationResult,
          WARNINGS.initUnsupportedKeys.code,
          Errors.AlertHistoryCreate.InvalidDtoIn
        );
    
        let data = dtoIn
        // if (!dtoIn.status) data.status = true
        // data.checked = false
        // data.checkTime = "0000-00-00T00:00:00Z"
    
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
        let alertHistory = await this.dao.create(data);
    
        const dtoOut = {
          ...alertHistory,
          uuAppErrorMap,
        };
    
        return dtoOut
  }

  async alertHistoryList(awid, dtoIn) {
     // TODO filtr na status

     let uuAppErrorMap;

     const validationResult = this.validator.validate("alertHistoryListDtoInType", dtoIn);
     uuAppErrorMap = ValidationHelper.processValidationResult(
       dtoIn,
       validationResult,
       WARNINGS.initUnsupportedKeys.code,
       Errors.AlertHistoryList.InvalidDtoIn
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
         throw new Errors.AlertHistoryList.DaoListFailed({ uuAppErrorMap }, e);
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

module.exports = new AlertHistoryAbl();

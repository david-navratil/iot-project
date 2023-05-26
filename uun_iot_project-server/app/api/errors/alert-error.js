"use strict";

const IotProjectUseCaseError = require("./iot-project-use-case-error.js");
const ALERT_ERROR_PREFIX = `${IotProjectUseCaseError.ERROR_PREFIX}alert/`;

const AlertList = {
  UC_CODE: `${ALERT_ERROR_PREFIX}alertList/`,
  InvalidDtoIn: class extends IotProjectUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${AlertList.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
  AlertDaoListFailed: class extends IotProjectUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${SectionUpdate.UC_CODE}daoFailed`;
      this.message = "List records from database failed.";
    }
  },
};

const AlertCheck = {
  UC_CODE: `${ALERT_ERROR_PREFIX}alertCheck/`,
  InvalidDtoIn: class extends IotProjectUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${AlertCheck.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
  AlertDaoCheckFailed: class extends IotProjectUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${AlertCheck.UC_CODE}daoFailed`;
      this.message = "Update record in database failed.";
    }
  },
  InvalidId: class extends IotProjectUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${AlertCheck.UC_CODE}invalidDtoIn`;
      this.message = "Alert id is not valid.";
    }
  },
};

const AlertDelete = {
  UC_CODE: `${ALERT_ERROR_PREFIX}alertDelete/`,
  InvalidDtoIn: class extends IotProjectUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${AlertDelete.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
  AlertDaoDeleteFailed: class extends IotProjectUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${AlertDelete.UC_CODE}daoFailed`;
      this.message = "Delete record in database failed.";
    }
  },
  InvalidId: class extends IotProjectUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${AlertDelete.UC_CODE}invalidDtoIn`;
      this.message = "Alert id is not valid.";
    }
  },
};

const AlertCreate = {
  UC_CODE: `${ALERT_ERROR_PREFIX}alertCreate/`,
  InvalidDtoIn: class extends IotProjectUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${AlertCreate.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
  InvalidSensorId: class extends IotProjectUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${AlertCreate.UC_CODE}invalidDtoIn`;
      this.message = "SensorId is not valid.";
    }
  },
};

module.exports = {
  AlertCreate,
  AlertDelete,
  AlertCheck,
  AlertList
};

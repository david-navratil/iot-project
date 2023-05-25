"use strict";

const IotProjectUseCaseError = require("./iot-project-use-case-error.js");
const SECTION_ERROR_PREFIX = `${IotProjectUseCaseError.ERROR_PREFIX}section/`;

const SectionCreate = {
  UC_CODE: `${SECTION_ERROR_PREFIX}sectionCreate/`,
  InvalidDtoIn: class extends IotProjectUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${SectionCreate.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
};

const SectionUpdate = {
  UC_CODE: `${SECTION_ERROR_PREFIX}sectionUpdate/`,
  InvalidId: class extends IotProjectUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${SectionUpdate.UC_CODE}invalidId`;
      this.message = "Section with given Id does not exists.";
    }
  },
  InvalidSensorId: class extends IotProjectUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${SectionUpdate.UC_CODE}invalidId`;
      this.message = "Sensor with given Id does not exists.";
    }
  },
  InvalidDtoIn: class extends IotProjectUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${SectionUpdate.UC_CODE}invalidDtoIn`;
      this.message = "Dto In is not valid.";
    }
  },
  SectionDaoUpdateFailed: class extends IotProjectUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${SectionUpdate.UC_CODE}daoFailed`;
      this.message = "Update record in database failed.";
    }
  },
};

const SectionDelete = {
  UC_CODE: `${SECTION_ERROR_PREFIX}sectionDelete/`,
  InvalidId: class extends IotProjectUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${SectionDelete.UC_CODE}invalidId`;
      this.message = "Section with given Id does not exists.";
    }
  },
  SectionDaoDeleteFailed: class extends IotProjectUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${SectionDelete.UC_CODE}daoFailed`;
      this.message = "Delete record from database failed.";
    }
  },
};

const SectionList = {
  UC_CODE: `${SECTION_ERROR_PREFIX}sectionList/`,
  DaoListFailed: class extends IotProjectUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${SectionList.UC_CODE}daoFailed`;
      this.message = "List records from database failed.";
    }
  },
};

module.exports = {
  SectionList,
  SectionDelete,
  SectionUpdate,
  SectionCreate
};

"use strict";
const SectionAbl = require("../../abl/section-abl.js");

class SectionController {

  sectionList(ucEnv) {
    return SectionAbl.sectionList(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

  sectionDelete(ucEnv) {
    return SectionAbl.sectionDelete(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

  sectionUpdate(ucEnv) {
    return SectionAbl.sectionUpdate(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

  sectionCreate(ucEnv) {
    return SectionAbl.sectionCreate(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

}

module.exports = new SectionController();

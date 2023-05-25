"use strict";
const { UuObjectDao } = require("uu_appg01_server").ObjectStore;

class AlertMongo extends UuObjectDao {

  async createSchema(){
  }

}

module.exports = AlertMongo;

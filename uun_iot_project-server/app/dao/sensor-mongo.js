"use strict";
const { UuObjectDao } = require("uu_appg01_server").ObjectStore;

class SensorMongo extends UuObjectDao {

  async createSchema(){
  }

}

module.exports = SensorMongo;

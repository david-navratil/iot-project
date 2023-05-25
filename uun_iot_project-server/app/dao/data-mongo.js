"use strict";
const { UuObjectDao } = require("uu_appg01_server").ObjectStore;

class DataMongo extends UuObjectDao {

  async createSchema(){
  }

}

module.exports = DataMongo;

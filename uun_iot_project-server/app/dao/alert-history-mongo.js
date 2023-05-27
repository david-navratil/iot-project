"use strict";
const { UuObjectDao } = require("uu_appg01_server").ObjectStore;

class AlertHistoryMongo extends UuObjectDao {

  async createSchema(){
  }
  
  async create(uuObject) {
    return await super.insertOne(uuObject);
  }

  async list(awid, sortBy, order, pageInfo) {
    const filter = { awid };

    const sort = {
      [sortBy]: order === "asc" ? 1 : -1,
    };

    return await super.find(filter, pageInfo, sort);
  }
}

module.exports = AlertHistoryMongo;

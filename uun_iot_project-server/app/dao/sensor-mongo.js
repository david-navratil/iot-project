"use strict";
const { UuObjectDao } = require("uu_appg01_server").ObjectStore;

class SensorMongo extends UuObjectDao {

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

  async get(awid, id) {
    let filter = {
      awid: awid,
      id: id,
    };
    return await super.findOne(filter);
  }

  async getByNodeId(awid, nodeId) {
    let filter = {
      awid: awid,
      nodeId: nodeId,
    };
    return await super.findOne(filter);
  }

  async update(uuObject) {
    let filter = {
      awid: uuObject.awid,
      id: uuObject.sensorid,
    };
    return await super.findOneAndUpdate(filter, uuObject, "NONE");
  }

  async remove(uuObject) {
    let filter = {
      awid: uuObject.awid,
      id: uuObject.sensorid,
    };
    return await super.deleteOne(filter);
  }
}

module.exports = SensorMongo;

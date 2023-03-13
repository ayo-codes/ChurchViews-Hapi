import { v4 } from "uuid";
import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";

const db = new Low(new JSONFile("./src/models/json/churches.json"));
db.data = { churches: [] };

export const churchJsonStore = {
  async getAllChurches() {
    await db.read();
    return db.data.churches;
  },

  async addChurch(denominationId, church) {
    await db.read();
    church._id = v4();
    church.denominationid = denominationId;
    db.data.churches.push(church);
    await db.write();
    return church;
  },

  async getChurchesByDenominationId(id) {
    await db.read();
    return db.data.churches.filter((church) => church.denominationid === id);
  },

  async getChurchById(id) {
    await db.read();
    return db.data.churches.find((church) => church._id === id);
  },

  async deleteChurch(id) {
    await db.read();
    const index = db.data.churches.findIndex((church) => church._id === id);
    db.data.churches.splice(index, 1);
    await db.write();
  },

  async deleteAllChurches() {
    db.data.churches = [];
    await db.write();
  },

  async updateChurch(church, updatedChurch) {
    church.name = updatedChurch.name;
    church.description = updatedChurch.description;
    church.latitude = updatedChurch.latitude;
    church.longitude = updatedChurch.longitude;
    await db.write();
  },
};

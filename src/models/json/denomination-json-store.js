import { v4 } from "uuid";
import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";
import { churchJsonStore } from "./church-json-store";

const db = new Low(new JSONFile("./src/models/json/denominations.json"));
db.data = { denominations: [] };

export const denominationJsonStore = {
  async getAllDenominations() {
    await db.read();
    return db.data.denominations;
  },

  async addDenomination(denomination) {
    await db.read();
    denomination._id = v4();
    db.data.denominations.push(denomination);
    await db.write();
    return denomination;
  },

  async getDenominationById(id) {
    await db.read();
    const list = db.data.denominations.find((denomination) => denomination._id === id);
    list.churches = await churchJsonStore.getChurchesByDenominationId(list._id);
    return list;
  },

  async getUserDenominations(userid) {
    await db.read();
    return db.data.denominations.filter((denomination) => denomination.userid === userid);
  },

  async deleteDenominationById(id) {
    await db.read();
    const index = db.data.denominations.findIndex((denomination) => denomination._id === id);
    db.data.denominations.splice(index, 1);
    await db.write();
  },

  async deleteAllDenominations() {
    db.data.denominations = [];
    await db.write();
  },
};

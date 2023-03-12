import { v4 } from "uuid";
import { churchMemStore } from "./church-mem-store.js";

let denominations = [];

export const denominationMemStore = {
  async getAllDenominations() {
    return denominations;
  },

  async addDenomination(denomination) {
    denomination._id = v4();
    denominations.push(denomination);
    return denomination;
  },

  async getDenominationById(id) {
    const list = denominations.find((denomination) => denomination._id === id); // store the result of the search in a variable 
    list.churches = await churchMemStore.getChurchesByDenominationId(list._id); // pass the list id which is the id from the denominations.find result , into the search of getChurchesByDenominationId 
    return list;
  },

  async deleteDenominationById(id) {
    const index = denominations.findIndex((denomination) => denomination._id === id);
    denominations.splice(index, 1);
  },

  async deleteAlldenominations() {
    denominations = [];
  },
};

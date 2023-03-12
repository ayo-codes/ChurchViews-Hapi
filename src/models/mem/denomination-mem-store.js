import { v4 } from "uuid";

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
    return denominations.find((denomination) => denomination._id === id);
  },

  async deleteDenominationById(id) {
    const index = denominations.findIndex((denomination) => denomination._id === id);
    denominations.splice(index, 1);
  },

  async deleteAlldenominations() {
    denominations = [];
  },
};

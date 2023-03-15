import { Denomination } from "./denomination.js";
import { churchMongoStore } from "./church-mongo-store.js";

export const denominationMongoStore = {
  async getAllDenominations() {
    const denominations = await Denomination.find().lean();
    return denominations;
  },

  async getDenominationById(id) {
    if (id) {
      const denomination = await Denomination.findOne({ _id: id }).lean();
      if (denomination) {
        denomination.tracks = await churchMongoStore.getChurchesByDenominationId(denomination._id);
      }
      return denomination;
    }
    return null;
  },

  async addDenomination(denomination) {
    const newDenomination = new Denomination(denomination);
    const denominationObj = await newDenomination.save();
    return this.getDenominationById(denominationObj._id);
  },

  async getUserDenominations(id) {
    const denomination = await Denomination.find({ userid: id }).lean();
    return denomination;
  },

  async deleteDenominationById(id) {
    try {
      await Denomination.deleteOne({ _id: id });
    } catch (error) {
      console.log("bad id");
    }
  },

  async deleteAllDenominations() {
    await Denomination.deleteMany({});
  }
};

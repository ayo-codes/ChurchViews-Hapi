import { Church } from "./church.js";

export const churchMongoStore = {
  async getAllChurches(id) {
    const churches = await Church.find().lean();
    return churches;
  },

  async addChurch(denominationId, church) {
    church.denominationid = denominationId;
    const newChurch = new Church(church);
    const churchObj = await newChurch.save();
    return this.getChurchById(churchObj._id);
  },

  async getChurchesByDenominationId(id) {
    const churches = await Church.find({ denominationid: id }).lean();
    return churches;
  },

  async getChurchById(id) {
    if (id) {
      const church = await Church.findOne({ _id: id }).lean();
      return church;
    }
    return null;
  },

  async deleteChurch(id) {
    try {
      await Church.deleteOne({ _id: id });
    } catch (error) {
      console.log("bad id");
    }
  },

  async deleteAllChurches() {
    await Church.deleteMany({});
  },

  async updateChurch(church, updatedChurch) {
    const churchDoc = await Church.findOne({ _id: church._id });
    churchDoc.name = updatedChurch.name;
    churchDoc.description = updatedChurch.description;
    churchDoc.latitude = updatedChurch.latitude;
    churchDoc.longitude = updatedChurch.longitude;
    await churchDoc.save();
  },
};

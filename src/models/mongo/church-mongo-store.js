import { Church } from "./church.js";

export const churchMongoStore = {
  async getChurchesByDenominationId(id) {
    const churches = await Church.find({ playlistid: id }).lean();
    return churches;
  },
};

import { v4 } from "uuid";

let churches = [];

export const churchMemStore = {
  async getAllChurches() {
    return churches;
  },

  async addChurch(denominationId, church) {
    church._id = v4();
    church.denominationid = denominationId;
    churches.push(church);
    return church;
  },

  async getChurchesByDenominationId(id) {
    return churches.filter((church) => church.denominationid === id);
  },

  async getChurchById(id) {
    return churches.find((church) => church._id === id);
  },

  async getDenominationChurches(denominationId) {
    return churches.filter((church) => church.denominationid === denominationId);
  },

  async deleteChurch(id) {
    const index = churches.findIndex((church) => church._id === id);
    churches.splice(index, 1);
  },

  async deleteAllChurches() {
    churches = [];
  },

  async updateChurch(church, updatedChurch){
    church.name = updatedChurch.name;
    church.description = updatedChurch.description;
    church.latitude = updatedChurch.latitude;
    church.longitude = updatedChurch.longitude;
  },
};

import axios from "axios";

import { serviceUrl } from "../fixtures.js";

export const churchviewService = {

  churchviewUrl: serviceUrl,

  async createUser(user) {
    const res = await axios.post(`${this.churchviewUrl}/api/users`, user);
    return res.data;
  },

  async getUser(id) {
    const res = await axios.get(`${this.churchviewUrl}/api/users/${id}`);
    return res.data;
  },

  async getAllUsers() {
    const res = await axios.get(`${this.churchviewUrl}/api/users`);
    return res.data;
  },

  async deleteAllUsers() {
    const res = await axios.delete(`${this.churchviewUrl}/api/users`);
    return res.data;
  },

  async createDenomination(denomination) {
    const res = await axios.post(`${this.churchviewUrl}/api/denominations`, denomination);
    return res.data;
  },

  async deleteAllDenominations() {
    const response = await axios.delete(`${this.churchviewUrl}/api/denominations`);
    return response.data;
  },

  async deleteDenomination(id) {
    const response = await axios.delete(`${this.churchviewUrl}/api/denominations/${id}`);
    return response;
  },

  async getAllDenominations() {
    const res = await axios.get(`${this.churchviewUrl}/api/denominations`);
    return res.data;
  },

  async getDenomination(id) {
    const res = await axios.get(`${this.churchviewUrl}/api/denominations/${id}`);
    return res.data;
  },
};


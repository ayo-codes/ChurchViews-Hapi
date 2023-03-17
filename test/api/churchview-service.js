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

  async getAllChurches() {
    const res = await axios.get(`${this.churchviewUrl}/api/churches`);
    return res.data;
  },

  async createChurch(id, church) {
    const res = await axios.post(`${this.churchviewUrl}/api/denominations/${id}/churches`, church);
    return res.data;
  },

  async deleteAllChurches() {
    const res = await axios.delete(`${this.churchviewUrl}/api/churches`);
    return res.data;
  },

  async getChurch(id) {
    const res = await axios.get(`${this.churchviewUrl}/api/churches/${id}`);
    return res.data;
  },

  async deleteChurch(id) {
    const res = await axios.delete(`${this.churchviewUrl}/api/churches/${id}`);
    return res.data;
  },

  async authenticate(user) {
    const response = await axios.post(`${this.churchviewUrl}/api/users/authenticate`, user);
    axios.defaults.headers.common["Authorization"] = "Bearer " + response.data.token;
    return response.data;
  },

  async clearAuth() {
    axios.defaults.headers.common["Authorization"] = "";
  }

};


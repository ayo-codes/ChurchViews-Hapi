import { userMemStore } from "./mem/user-mem-store.js";
import { denominationMemStore } from "./mem/denomination-mem-store.js";
import { churchMemStore } from "./mem/church-mem-store.js";

export const db = {
  userStore: null,
  denominationStore: null,
  churchStore: null,

  init() {
    this.userStore = userMemStore;
    this.denominationStore = denominationMemStore;
    this.churchStore = churchMemStore;
  },
};

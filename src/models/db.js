// import { userMemStore } from "./mem/user-mem-store.js";
// import { denominationMemStore } from "./mem/denomination-mem-store.js";
// import { churchMemStore } from "./mem/church-mem-store.js";

import { userJsonStore } from "./json/user-json-store.js";
import { denominationJsonStore } from "./json/denomination-json-store.js";
import { churchJsonStore } from "./json/church-json-store.js";

export const db = {
  userStore: null,
  denominationStore: null,
  churchStore: null,

  init() {
    this.userStore = userJsonStore;
    this.denominationStore = denominationJsonStore;
    this.churchStore = churchJsonStore;
  },
};

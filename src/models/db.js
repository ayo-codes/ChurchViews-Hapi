import { userMemStore } from "./mem/user-mem-store.js";
import { denominationMemStore } from "./mem/denomination-mem-store.js";
import { churchMemStore } from "./mem/church-mem-store.js";

import { userJsonStore } from "./json/user-json-store.js";
import { denominationJsonStore } from "./json/denomination-json-store.js";
import { churchJsonStore } from "./json/church-json-store.js";

import { connectMongo } from "./mongo/connect.js";
import { userMongoStore } from "./mongo/user-mongo-store.js";

export const db = {
  userStore: null,
  denominationStore: null,
  churchStore: null,

  init(storeType) {
    switch (storeType){
      case "json":
        this.userStore = userJsonStore;
        this.denominationStore = denominationJsonStore;
        this.churchStore = churchJsonStore;
        break;
      case "mongo":
        this.userStore = userMongoStore;
        connectMongo();
        break;
      default:
        this.userStore = userMemStore;
        this.denominationStore = denominationMemStore;
        this.churchStore = churchMemStore;
    }
  },
};

import { userApi } from "./api/user-api.js";
import { denominationApi } from "./api/denomination-api.js";
import { churchApi } from "./api/church-api.js";

export const apiRoutes = [
  { method: "GET", path: "/api/users", config: userApi.find },
  { method: "POST", path: "/api/users", config: userApi.create },
  { method: "DELETE", path: "/api/users", config: userApi.deleteAll },
  { method: "GET", path: "/api/users/{id}", config: userApi.findOne },


  { method: "POST", path: "/api/denominations", config: denominationApi.create },
  { method: "DELETE", path: "/api/denominations", config: denominationApi.deleteAll },
  { method: "GET", path: "/api/denominations", config: denominationApi.find },
  { method: "GET", path: "/api/denominations/{id}", config: denominationApi.findOne },
  { method: "DELETE", path: "/api/denominations/{id}", config: denominationApi.deleteOne },


  { method: "GET", path: "/api/churches", config: churchApi.find },
  { method: "GET", path: "/api/churches/{id}", config: churchApi.findOne },
  { method: "POST", path: "/api/denominations/{id}/churches", config: churchApi.create },
  { method: "DELETE", path: "/api/churches", config: churchApi.deleteAll },
  { method: "DELETE", path: "/api/churches/{id}", config: churchApi.deleteOne },

];

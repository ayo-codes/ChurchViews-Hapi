import { accountsController } from "./controllers/accounts-controller.js";
import { dashboardController } from "./controllers/dashboard-controller.js";
import { aboutController } from "./controllers/about-controller.js";
import { denominationController } from "./controllers/denomination-controller.js";

export const webRoutes = [
  // accounts controllers
  { method: "GET", path: "/", config: accountsController.index },
  { method: "GET", path: "/signup", config: accountsController.showSignup },
  { method: "GET", path: "/login", config: accountsController.showLogin },
  { method: "GET", path: "/logout", config: accountsController.logout },
  { method: "POST", path: "/register", config: accountsController.signup },
  { method: "POST", path: "/authenticate", config: accountsController.login },

  // dashboard controllers
  { method: "GET", path: "/dashboard", config: dashboardController.index },
  { method: "POST", path: "/dashboard/adddenomination", config: dashboardController.addDenomination },
  {method:"GET", path:"/dashboard/deletedenomination/{id}", config:dashboardController.deleteDenomination},

  // about controllers
  {method:"GET", path:"/about", config: aboutController.index},

  // denomination controllers
  {method:"GET", path:"/denomination/{id}", config:denominationController.index},
  {method:"POST", path:"/denomination/{id}/addchurch", config:denominationController.addChurch},
  { method: "GET", path: "/denomination/{id}/deletechurch/{churchid}", config: denominationController.deleteChurch },

  // assets 
  { method: "GET", path: "/{param*}", handler: { directory: { path: "./public" } }, options: { auth: false } }

];

import { accountsController } from "./controllers/accounts-controller.js";
import { dashboardController } from "./controllers/dashboard-controller.js";
import { aboutController } from "./controllers/about-controller.js";
import { denominationController } from "./controllers/denomination-controller.js";
import { profileController } from "./controllers/profile-controller.js";
import { backofficeController } from "./controllers/backoffice-controller.js";
import { churchController } from "./controllers/church-controller.js";

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

  // profile controllers
  {method:"GET", path:"/profile", config:profileController.index},

  // backoffice controllers
  {method:"GET", path:"/backoffice", config:backofficeController.index},

  // church controllers
  {method:"GET", path:"/church/{id}/editchurch/{churchid}", config:churchController.index},
  {method:"POST", path:"/church/{id}/updatechurch/{churchid}", config:churchController.updateChurch},

  // denomination controllers
  {method:"GET", path:"/denomination/{id}", config:denominationController.index},
  {method:"POST", path:"/denomination/{id}/addchurch", config:denominationController.addChurch},
  { method: "GET", path: "/denomination/{id}/deletechurch/{churchid}", config: denominationController.deleteChurch },

  // assets 
  { method: "GET", path: "/{param*}", handler: { directory: { path: "./public" } }, options: { auth: false } },

  // images 
  { method: "POST", path: "/denomination/{id}/uploadimage", config: denominationController.uploadImage }


];

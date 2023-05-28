import { accountsController } from "./controllers/accounts-controller.js";
import { dashboardController } from "./controllers/dashboard-controller.js";
import { aboutController } from "./controllers/about-controller.js";
import { denominationController } from "./controllers/denomination-controller.js";
import { profileController } from "./controllers/profile-controller.js";
import { backofficeController } from "./controllers/backoffice-controller.js";
import { churchController } from "./controllers/church-controller.js";
import { userController } from "./controllers/user-controller.js";
import { denominationUpdateController } from "./controllers/denomination-update-controller.js";

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

  // user controllers
  {method:"GET", path:"/user/{userid}/edituser", config:userController.index},
  {method:"POST", path:"/user/{userid}/updateuser", config:userController.updateUser},

  // denomination controllers
  {method:"GET", path:"/denomination/{id}", config:denominationController.index},
  {method:"POST", path:"/denomination/{id}/addchurch", config:denominationController.addChurch},
  { method: "GET", path: "/denomination/{id}/deletechurch/{churchid}", config: denominationController.deleteChurch },

  // denomination-update-controllers
  {method:"GET", path:"/denomination/{id}/editdenomination", config: denominationUpdateController.index},
  {method:"POST", path:"/denomination/{id}/updatedenomination", config: denominationUpdateController.updateDenomination},

  // assets 
  { method: "GET", path: "/{param*}", handler: { directory: { path: "./public" } }, options: { auth: false } },

  // images 
  { method: "POST", path: "/denomination/{id}/uploadimage", config: denominationController.uploadImage },

  // 

  {
    method: "GET",
    path: "/github-login",
    config: {
      auth: "github-oauth",
      handler: function (request, h) {
        if (request.auth.isAuthenticated) {
          request.cookieAuth.set(request.auth.credentials);
          return (`Hello ${  request.auth.credentials.profile.displayName}`);
        }
        return("Not logged in...");
      }
    }
  }, {
    method: "GET",
    path: "/github-account",
    config: {
      auth: "session",
      handler: function (request, h) {
        if (request.auth.isAuthenticated) {
          return(request.auth.credentials.profile);
        }
      }
    }
  }, {
    method: "GET",
    path: "/github-userinfo",
    config: {
      auth: "session",
      handler: function (request, h) {
        if (request.auth.isAuthenticated) {
          return("<h2>From your GitHub profile</h2>"
          + `<b>User name:</b> ${  request.auth.credentials.profile.username
           }<br><b>Display name:</b> ${  request.auth.credentials.profile.displayName
           }<br><b>Email address:</b> ${  request.auth.credentials.profile.email
           }<br><b>Affiliation:</b> ${  request.auth.credentials.profile.raw.company}`);
        }
      }
    }
  }, {
    method: "GET",
    path: "/github-loggedin",
    config: {
      auth: {
        mode: "optional"
      },
      handler: function (request, h) {
        if (request.auth.isAuthenticated) {
          return (`Hello ${  request.auth.credentials.profile.displayName}`);
        }
        return("Not logged in...");
      }
    }
  }, {
    method: "GET",
    path: "/github-logout",
    config: {
      auth: false,
      handler: function (request, h) {
        request.cookieAuth.clear();
        return("Logged out now! Note you are just logged out of this app and not GitHub. Going to /login will log you back in again.");
      }
    }
  }

];

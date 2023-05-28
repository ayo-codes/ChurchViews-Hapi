import Hapi from "@hapi/hapi";
import Vision from "@hapi/vision";
import Cookie from "@hapi/cookie"; // for use with the cookies
import Inert from "@hapi/inert"; // for use with inert for static images
import Handlebars from "handlebars";
import Bell from "@hapi/bell"; // added for oAuth
import dotenv from "dotenv";
import jwt from "hapi-auth-jwt2";

import Joi from "joi";
import os from "os"; //added for oAuth
import HapiSwagger from "hapi-swagger";
import path from "path";
import disinfect from "disinfect";
import { fileURLToPath } from "url";
import { validate } from "./api/jwt-utils.js";
import { webRoutes } from "./web-routes.js";
import { db } from "./models/db.js";
import { accountsController } from "./controllers/accounts-controller.js"; // for use with authentication
import { apiRoutes } from "./api-routes.js";

// const swaggerOptions = {
//   info: {
//     title: "ChurchViews API",
//     version: "0.1",
//   },
//   securityDefinitions: {
//     jwt: {
//       type: "apiKey",
//       name: "Authorization",
//       in: "header"
//     }
//   },
//   security: [{ jwt: [] }]
// };

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

os.tmpDir = os.tmpdir; // added for oauth 
const result = dotenv.config();
if (result.error) {
  console.log(result.error.message);
  process.exit(1);
}

async function init() {
  const server = Hapi.server({
    port: process.env.PORT || 3000,
    routes: {cors:true},
  
  });
  await server.register(Bell); // added for oAuth
  await server.register(Vision);
  await server.register(Cookie);
  await server.register(Inert);
  await server.register(jwt);
  await server.register(({
    plugin: disinfect,
    options: {
        disinfectQuery: true,
        disinfectParams: true,
        disinfectPayload: true
    }
  }))
  // await server.register([
  //   Inert,
  //   Vision,
  //   {
  //     plugin: HapiSwagger,
  //     options: swaggerOptions,
  //   },
  // ]);

  server.validator(Joi); // includes joi 


  server.views({
    engines: {
      hbs: Handlebars,
    },
    relativeTo: __dirname,
    path: "./views",
    layoutPath: "./views/layouts",
    partialsPath: "./views/partials",
    layout: true,
    isCached: false,
  });
  server.auth.strategy("session", "cookie", {
    cookie: {
      name: process.env.cookie_name,
      password: process.env.cookie_password,
      isSecure: false,
    },
    redirectTo: "/",
    validate: accountsController.validate,
  });
  server.auth.default("session"); // this sets the default authentication strategy

  const bellAuthOptions = {
    provider: "github",
    password: "github-encryption-password-secure", // String used to encrypt cookie
    // used during authorisation steps only
    clientId: process.env.github_clientId,          // *** Replace with your app Client Id ****
    clientSecret: process.env.github_clientSecret ,  // *** Replace with your app Client Secret ***
    isSecure: false       // Should be 'true' in production software (requires HTTPS)
  };

  server.auth.strategy("jwt", "jwt", {
    key: process.env.cookie_password,
    validate: validate,
    verifyOptions: { algorithms: ["HS256"] }
  });
  
  server.auth.strategy("github-oauth", "bell", bellAuthOptions);

  db.init("mongo");
  server.route(webRoutes);
  server.route(apiRoutes);
  await server.start();
  console.log("Server running on %s", server.info.uri);
}

process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});

await init();

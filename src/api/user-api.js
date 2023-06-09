import bcrypt from "bcrypt";
import Boom from "@hapi/boom";
import { db } from "../models/db.js";
import { UserArray , UserSpec , IdSpec, UserSpecPlus , JwtAuth, UserCredentialsSpec} from "../models/joi-schemas.js";
import { validationError } from "./logger.js";
import { createToken } from "./jwt-utils.js";

const saltRounds = 10;

export const userApi = {
  create: {
    auth: false,
    handler: async function(request, h) {
      try {
        const userPayload = request.payload;
        console.log(userPayload);
        userPayload.password = await bcrypt.hash(userPayload.password, saltRounds);
        console.log(userPayload.password)
        const user = await db.userStore.addUser(userPayload);
        console.log(user);
        if (user) {
          return h.response(user).code(201);
        // const user = await db.userStore.addUser(request.payload);
        // if (user) {
        //   return h.response(user).code(201);
        }
        return Boom.badImplementation("error creating user");
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    // tags: ["api"],
    // description: "Create a User",
    // notes: "Returns the newly created user",
    validate: { payload: UserSpec, failAction: validationError },
    response: { schema: UserSpecPlus, failAction: validationError },
  },

  find: {
    auth: {
      strategy: "jwt",
    },
    handler: async function(request, h) {
      try {
        const users = await db.userStore.getAllUsers();
        return users;
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    // tags: ["api"],
    // description: "Get all userApi",
    // notes: "Returns details of all userApi",
    response : {schema: UserArray , failAction: validationError },
  },

  findOne: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const user = await db.userStore.getUserById(request.params.id);
        if (!user) {
          return Boom.notFound("No User with this id");
        }
        return user;
      } catch (err) {
        return Boom.serverUnavailable("No User with this id");
      }
    },
    // tags: ["api"],
    // description: "Get a specific user",
    // notes: "Returns user details",
    response: { schema: UserSpecPlus, failAction: validationError },
    validate: { params: { id: IdSpec }, failAction: validationError },

  },

  deleteAll: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        await db.userStore.deleteAll();
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    // tags: ["api"],
    // description: "Delete all userApi",
    // notes: "All userApi removed from ChurchViews",
    
  },

  authenticate: {
    auth: false,
    handler: async function (request, h) {
      try {
        const user = await db.userStore.getUserByEmail(request.payload.email);
        if (!user) {
          return Boom.unauthorized("User not found");
        }
        if (await bcrypt.compare(request.payload.password, user.password)){
          const token = createToken(user);
          return h.response({ success: true, token: token, id: user._id }).code(201);
        };
        // if (user.password !== request.payload.password) {
          return Boom.unauthorized("Invalid password");
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    // tags: ["api"],
    // description: "Authenticate a User",
    // notes: "If user has valid email/password, create and return a JWT token",
    // validate: {payload: UserCredentialsSpec, failAction: validationError },
    // response: { schema: JwtAuth, failAction: validationError }
  },
};

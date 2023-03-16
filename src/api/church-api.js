import Boom from "@hapi/boom";
import { db } from "../models/db.js";
import { IdSpec, ChurchSpec , ChurchSpecPlus , ChurchArraySpec } from "../models/joi-schemas.js";
import { validationError } from "./logger.js";

export const churchApi = {
  find: {
    auth: false,
    handler: async function (request, h) {
      try {
        const churches = await db.churchStore.getAllChurches();
        return churches;
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    response: { schema: ChurchArraySpec, failAction: validationError },
    description: "Get all churchApi",
    notes: "Returns all churches in the database via the Api",
  },

  findOne: {
    auth: false,
    async handler(request) {
      try {
        const church = await db.churchStore.getChurchById(request.params.id);
        if (!church) {
          return Boom.notFound("No church with this id");
        }
        return church;
      } catch (err) {
        return Boom.serverUnavailable("No church with this id");
      }
    },
    tags: ["api"],
    description: "Find a Church",
    notes: "Returns a Church",
    validate: { params: { id: IdSpec }, failAction: validationError },
    response: { schema: ChurchSpecPlus, failAction: validationError },
  },

  create: {
    auth: false,
    handler: async function (request, h) {
      try {
        const church = await db.churchStore.addChurch(request.params.id, request.payload);
        if (church) {
          return h.response(church).code(201);
        }
        return Boom.badImplementation("error creating church");
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Create a church",
    notes: "Returns the newly created church",
    validate: { payload: ChurchSpec },
    response: { schema: ChurchSpecPlus, failAction: validationError }
  },

  deleteAll: {
    auth: false,
    handler: async function (request, h) {
      try {
        await db.churchStore.deleteAllChurches();
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Deletes all churches in the database via the churchApi",
  },

  deleteOne: {
    auth: false,
    handler: async function (request, h) {
      try {
        const church = await db.churchStore.getChurchById(request.params.id);
        if (!church) {
          return Boom.notFound("No church with this id");
        }
        await db.churchStore.deleteChurch(church._id);
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("No church with this id");
      }
    },
    tags: ["api"],
    description: "Delete a church",
    validate: { params: { id: IdSpec }, failAction: validationError },
  },
};

import Boom from "@hapi/boom";
import { db } from "../models/db.js";

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
  },
};

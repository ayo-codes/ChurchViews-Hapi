import Boom from "@hapi/boom";
import { db } from "../models/db.js";


export const denominationApi = {
  find: {
    auth: false,
    handler: async function (request, h) {
      try {
        const denominations = await db.denominationStore.getAllDenominations();
        return denominations;
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
  },


  findOne: {
    auth: false,
    async handler(request) {
      try {
        const denomination = await db.denominationStore.getDenominationById(request.params.id);
        if (!denomination) {
          return Boom.notFound("No Denomination with this id");
        }
        return denomination;
      } catch (err) {
        return Boom.serverUnavailable("No Denomination with this id");
      }
    },
  },

  create: {
    auth: false,
    handler: async function (request, h) {
      try {
        const denomination = request.payload;
        const newDenomination = await db.denominationStore.addDenomination(denomination);
        if (newDenomination) {
          return h.response(newDenomination).code(201);
        }
        return Boom.badImplementation("error creating denomination");
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
  },

  deleteOne: {
    auth: false,
    handler: async function (request, h) {
      try {
        const denomination = await db.denominationStore.getDenominationById(request.params.id);
        if (!denomination) {
          return Boom.notFound("No Denomination with this id");
        }
        await db.denominationStore.deleteDenominationById(denomination._id);
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("No Denomination with this id");
      }
    },
  },


  deleteAll: {
    auth: false,
    handler: async function (request, h) {
      try {
        await db.denominationStore.deleteAllDenominations();
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
  },

};

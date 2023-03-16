import Boom from "@hapi/boom";
import { db } from "../models/db.js";
import { validationError } from "./logger.js";
import { IdSpec, DenominationArraySpec, DenominationSpec, DenominationSpecPlus } from "../models/joi-schemas.js";


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
    tags: ["api"],
    response: { schema: DenominationArraySpec, failAction: validationError },
    description: "Get all denominations",
    notes: "Returns all denominations",
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
    tags: ["api"],
    description: "Find a Denomination",
    notes: "Returns a denomination",
    validate: { params: { id: IdSpec }, failAction: validationError },
    response: { schema: DenominationSpecPlus, failAction: validationError },
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
    tags: ["api"],
    description: "Create a Denomination",
    notes: "Returns the newly created denomination",
    validate: { payload: DenominationSpec, failAction: validationError },
    response: { schema: DenominationSpecPlus, failAction: validationError },
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
    tags: ["api"],
    description: "Delete a denomination",
    validate: { params: { id: IdSpec }, failAction: validationError },
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
    tags: ["api"],
    description: "Delete all Denominations via denominationApi",
  },

};

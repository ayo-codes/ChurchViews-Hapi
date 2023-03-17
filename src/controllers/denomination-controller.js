import { db } from "../models/db.js";
import { ChurchSpec } from "../models/joi-schemas.js";
import { imageStore } from "../models/image-store.js";

export const denominationController = {
  index: {
    handler: async function (request, h) {
      const denomination = await db.denominationStore.getDenominationById(request.params.id);
      const viewData = {
        title: "Denomination",
        denomination: denomination,
      };
      return h.view("denomination-view", viewData);
    },
  },

  addChurch: {
    validate: {
      payload: ChurchSpec,
      options: { abortEarly: false },
      failAction: function (request, h, error) {
        return h.view("denomination-view", { title: "Add church error", errors: error.details }).takeover().code(400);
      },
    },
    handler: async function (request, h) {
      const denomination = await db.denominationStore.getDenominationById(request.params.id);
      const newChurch = {
        name: request.payload.name,
        description: request.payload.description,
        latitude: Number(request.payload.latitude),
        longitude: Number(request.payload.longitude),

      };
      await db.churchStore.addChurch(denomination._id, newChurch);
      return h.redirect(`/denomination/${denomination._id}`);
    },
  },
  deleteChurch: {
    handler: async function(request, h) {
      const denomination = await db.denominationStore.getDenominationById(request.params.id);
      await db.churchStore.deleteChurch(request.params.churchid);
      return h.redirect(`/denomination/${denomination._id}`);
    },
  },

  uploadImage: {
    handler: async function (request, h) {
      try {
        const denomination = await db.denominationStore.getDenominationById(request.params.id);
        const file = request.payload.imagefile;
        if (Object.keys(file).length > 0) {
          const url = await imageStore.uploadImage(request.payload.imagefile);
          denomination.img = url;
          await db.denominationStore.updateDenomination(denomination);
        }
        return h.redirect(`/denomination/${denomination._id}`);
      } catch (err) {
        console.log(err);
        return h.redirect(`/denomination/${denomination._id}`);
      }
    },
    payload: {
      multipart: true,
      output: "data",
      maxBytes: 209715200,
      parse: true,
    },
  },

};

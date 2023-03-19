import { db } from "../models/db.js";
import { Denomination } from "../models/mongo/denomination.js";

export const denominationUpdateController = {
  index: {
    handler: async function (request ,h){
      const denomination = await db.denominationStore.getDenominationById(request.params.id);
      const viewData = {
        title: "Edit Denomination",
        denomination: denomination
      };
      return h.view("denomination-update-view" , viewData)
    },
  },

  updateDenomination: {
    handler: async function (request, h){
      const denominationId = request.params.id;
      const denomination = await db.denominationStore.getDenominationById(denominationId);

      console.log(request.payload);
      const updateToDenomination = {
       title: request.payload.title
      };
      await db.denominationStore.updateDenomination(denomination,updateToDenomination);
      return h.redirect("/dashboard")
    },
  },
};
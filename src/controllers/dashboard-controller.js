import { db } from "../models/db.js";

export const dashboardController = {
  index: {
    handler: async function (request, h) {
      const denominations = await db.denominationStore.getAllDenominations();
      const viewData = {
        title: "Churches Dashboard",
        denominations: denominations,
      };
      return h.view("dashboard-view", viewData);
    },
  },

  addDenomination: {
    handler: async function (request, h) {
      const newDenoMination = {
        title: request.payload.title,
      };
      await db.denominationStore.addDenomination(newDenoMination);
      return h.redirect("/dashboard");
    },
  },
};

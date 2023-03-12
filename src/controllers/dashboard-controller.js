import { db } from "../models/db.js";

export const dashboardController = {
  index: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const denominations = await db.denominationStore.getUserDenominations(loggedInUser._id);
      const viewData = {
        title: "Churches Dashboard",
        user: loggedInUser,
        denominations: denominations,
      };
      return h.view("dashboard-view", viewData);
    },
  },

  addDenomination: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const newDenoMination = {
        title: request.payload.title,
        userid: loggedInUser._id,
      };
      await db.denominationStore.addDenomination(newDenoMination);
      return h.redirect("/dashboard");
    },
  },
};

import { db } from "../models/db.js";


export const backofficeController = {
  index: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const allUsers = await db.userStore.getAllUsers();
      const allDenominations = await db.denominationStore.getAllDenominations();
      const allChurches = await db.churchStore.getAllChurches();
      const viewData = {
        title: "Back-Office",
        users: allUsers,
        denominations: allDenominations,
        churches: allChurches,
      };
      return h.view("backoffice-view", viewData);
    },
  },
};

import { db } from "../models/db.js";


export const backofficeController = {
  index: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const allUsers = await db.userStore.getAllUsers();
      const allDenominations = await db.denominationStore.getAllDenominations();
      const allChurches = await db.churchStore.getAllChurches();
      const numberOfChurches = await db.churchStore.numberOfChurches();
      const numberOfDenominations = await db.denominationStore.numberOfDenominations();
      const numberOfUsers = await db.userStore.numberOfUsers();
      const viewData = {
        title: "Back-Office",
        users: allUsers,
        denominations: allDenominations,
        churches: allChurches,
        numberOfChurches : numberOfChurches,
        numberOfDenominations : numberOfDenominations,
        numberOfUsers : numberOfUsers,
      };
      return h.view("backoffice-view", viewData);
    },
  },
};

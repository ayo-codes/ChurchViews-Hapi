import { db } from "../models/db.js";


export const profileController = {
  index: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const userProfile = await db.userStore.getUserById(loggedInUser._id);
      const viewData = {
        title: "Your Profile",
        user: userProfile
      };
      return h.view("profile-view", viewData);
    },
  },
};

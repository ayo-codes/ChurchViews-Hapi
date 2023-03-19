import { db } from "../models/db.js";

export const userController = {
  index: {
    handler: async function ( request, h){
      const loggedInUser = request.auth.credentials;
      const userProfile = await db.userStore.getUserById(loggedInUser._id);
      const viewData = {
        title: "Update User",
        user: userProfile
      };
      return h.view("user-update-view", viewData)
    },
  },

  updateUser:{
    handler: async function (request, h){
      const userId = request.params.userid;
      const user = await db.userStore.getUserById(userId);

      const newUser = {

        firstName: request.payload.firstName,
        lastName: request.payload.lastName,
        email: request.payload.email,
        password: request.payload.password,
        
      };

      await db.userStore.updateUser(user, newUser);
      return h.redirect("/profile")
    },
  }
};
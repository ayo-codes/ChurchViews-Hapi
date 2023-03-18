import { db } from "../models/db.js";

export const churchController = {
  index: {
    handler: async function (request, h){
      const denominationId = request.params.id;
      const churchId = request.params.churchid;
      const denomination = await db.denominationStore.getDenominationById(denominationId);
      const church = await db.churchStore.getChurchById(churchId);
      
      const viewData = {
        title: "Edit Church",
        denomination : denomination,
        church: church
      };
      return h.view("church-view" , viewData);
    },
   },

   updateChurch: {
    handler: async function (request,h){
      const denominationId = request.params.id;
      const churchId = request.params.churchid;
      const denomination = await db.denominationStore.getDenominationById(denominationId);
      const church = await db.churchStore.getChurchById(churchId);
      // updated church
      console.log(request.payload);
      const newChurch = {
        name: request.payload.name,
        description: request.payload.description,
        latitude: Number(request.payload.latitude),
        longitude: Number(request.payload.longitude)
      };
      await db.churchStore.updateChurch(church, newChurch);
      return h.redirect(`/denomination/${denominationId}`); // using string literals to form the url 
    },
   }
};
export const aboutController = {
  index: {
    handler: function (request, h) {
      const viewData = {
        title: "About ChurchViews",
      };
      return h.view("about-view", viewData);
    },
  },
};

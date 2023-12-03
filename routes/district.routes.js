import districtController from "../controller/district.controller.js";

export const districtRoutes = (app, opts, done) => {
  app.post(
    "/district",
    {
      schema: {
        description: "Scraping",
        tags: ["District Route"],
        body: {
          type: "object",
          properties: {
            name: { type: "string", description: "name of district" },
            lat: { type: "string", description: "latitude of district" },
            long: { type: "string", description: "longitude of district" },
          },
        },
      },
    },
    districtController.initDistrict
  );

  app.get(
    "/district",
    {
      schema: {
        description: "Scraping",
        tags: ["District Route"],
      },
    },
    districtController.getDistrictData
  );

  done();
};

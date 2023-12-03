import dataController from "../controller/data.controller.js";

export const dataRoutes = (app, opts, done) => {
  app.post(
    "/data",
    {
      schema: {
        description: "Scraping",
        tags: ["Data Route"],
        body: {
          type: "object",
          properties: {
            url: { type: "string", description: "URL" },
            dataset: { type: "integer", description: "Number of datasets" },
            data: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  selector: { type: "string", description: "Type of element" },
                },
              },
            },
            format: { type: "string", description: "File format" },
            filename: { type: "string", description: "filename" },
            startDate: { type: "string", description: "startDate" },
            endDate: { type: "string", description: "endDate" },
          },
        },
      },
    },
    dataController.dataCollecting
  );
  app.get(
    "/data/:id",
    {
      schema: {
        description: "Scraping",
        tags: ["Data Route"],
        params: {
          type: "object",
          properties: {
            id: {
              type: "string",
              description: "id of config",
            },
          },
        },
      },
    },
    dataController.getData
  );

  app.get(
    "/scraped-data/:id",
    {
      schema: {
        description: "Scraping",
        tags: ["Data Route"],
        params: {
          type: "object",
          properties: {
            id: {
              type: "string",
              description: "id of config",
            },
          },
        },
      },
    },
    dataController.getScrapData
  );

  app.get(
    "/data/district/:id",
    {
      schema: {
        description: "Scraping",
        tags: ["Data Route"],
        params: {
          type: "object",
          properties: {
            id: {
              type: "string",
              description: "id district",
            },
          },
        },
      },
    },
    dataController.getDataByDistrictId
  );

  done();
};

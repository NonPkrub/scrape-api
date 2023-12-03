import scrapeController from "../controller/scrape.controller.js";

export const scrapeRoutes = (app, opts, done) => {
  app.post(
    "/scrape",
    {
      schema: {
        description: "Scraping",
        tags: ["Scrape Route"],
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
          },
        },
      },
    },
    scrapeController.scrape
  );

  done();
};

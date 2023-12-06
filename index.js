import fastify from "fastify";
import { scrapeRoutes } from "./routes/scrape.routes.js";
import { dataRoutes } from "./routes/data.routes.js";
import dataController from "./controller/data.controller.js";
import cors from "@fastify/cors";
import swagger from "@fastify/swagger";
import { config } from "./config.js";
import { districtRoutes } from "./routes/district.routes.js";
import cron from "node-cron";
import { myCronJob } from "./controller/cronjob.js";
const app = fastify();
app.register(cors, {
  origin: "*",
});

app.register(swagger, {
  exposeRoute: true,
  routePrefix: "/api/docs",
  swagger: {
    info: {
      title: "Scraping data APIs",
      description: "Scraping data APIs",
      version: "0.1.0",
    },
  },
});

app.register(scrapeRoutes, { prefix: "/api" });
app.register(dataRoutes, { prefix: "/api" });
app.register(districtRoutes, { prefix: "/api" });
app.get("/", (req, res) => {
  res.send({ message: "success" });
});
app.post("/run-cron-job", (req, res) => {
  myCronJob();
  res.status(200).send("Cron job executed");
});

const start = async () => {
  try {
    await app.listen({ port: config.port, host: config.host });
    console.log("Server is listening on port:8080");
    //cron.schedule("0 9 * * *", myCronJob);
    // cron.schedule("*/5 * * * *", myCronJob);
  } catch (error) {
    console.error("Error starting server:", error);
    process.exit(1);
  }
};

start();
export default {
  app,
};

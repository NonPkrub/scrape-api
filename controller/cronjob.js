import { fastifyLogError } from "../services/fastify.log.err.js";
import { DataServices } from "../services/data.services.js";
import scrapeController from "./scrape.controller.js";
export const myCronJob = async () => {
  try {
    console.log("Cron job executed at:", new Date().toISOString());
    const jobs = await DataServices.getDataAll();

    const cronIds = jobs.map((job) => {
      const data = {
        id: job.id,
        endDate: job.endDate,
      };
      return data;
    });

    for (let i = 0; i < cronIds.length; i++) {
      const currentCronId = cronIds[i];
      console.log(
        "🚀 ~ file: cronjob.js:19 ~ myCronJob ~ currentCronId:",
        currentCronId
      );

      if (currentCronId.endDate < Date.now()) {
        return { message: "Check-in fail" };
      } else {
        console.log("execute job");
        const currentId = currentCronId.id;
        const currentData = await DataServices.getDataById(currentId);

        const config = {
          url: currentData.url,
          dataset: currentData.dataset,
          data: currentData.data,
          format: currentData.format,
          filename: currentData.filename,
          startDate: currentData.startDate,
          endDate: currentData.endDate,
        };

        console.log("🚀 ~ file: test.js:", i + 1, "~ config:", config);
        // Assuming scrapeController.onlineScrape is an asynchronous function
        await scrapeController.onlineScrape(currentId);
      }
    }
  } catch (err) {
    fastifyLogError(err);
  }
};

export const description = "daily";

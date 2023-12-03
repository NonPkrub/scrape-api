import puppeteer from "puppeteer";
import { DataServices } from "../services/data.services.js";
import { prisma } from "../services/prisma.client.js";
const scrape = async (request, reply) => {
  let browser;
  try {
    const config = request.body;
    browser = await puppeteer.launch({
      headless: "new",
      ignoreHTTPSErrors: true,
      executablePath: `/usr/bin/chromium-browser`,
      args: [
        `--disable-gpu`,
        `--disable-setuid-sandbox`,
        `--no-sandbox`,
        `--no-zygote`,
      ],
    });
    const page = await browser.newPage();
    await page.goto(config.url, {
      waitUntil: "domcontentloaded",
    });

    await page.waitForTimeout(5000);

    let previousHeight = 0;
    let currentHeight = await page.evaluate("document.body.scrollHeight");

    while (previousHeight < currentHeight) {
      // Scroll to the bottom of the page
      await page.evaluate("window.scrollTo(0, document.body.scrollHeight)");

      // Wait for some time after scrolling (adjust as needed)
      await page.waitForTimeout(2000);

      // Update height values
      previousHeight = currentHeight;
      currentHeight = await page.evaluate("document.body.scrollHeight");
    }

    const scrapedData = {};
    const selectors = config.data.map(({ selector }) => selector);
    for (let i = 1; i <= config.dataset; i++) {
      if (page.$(`:nth-child(${i})`)) {
        const indexedSelectors = selectors.map((selector) =>
          selector.replace("(i)", `(${i})`)
        );

        const elements = await Promise.all(
          indexedSelectors.map((selector) => page.$(selector))
        );

        const result = await Promise.all(
          elements.map(async (element) => {
            // Check if the element is not null before evaluating
            if (element) {
              return element.evaluate((node) => node.innerText);
            }
          })
        );

        for (let j = 0; j < selectors.length; j++) {
          const selector = selectors[j];
          let indexedSelector;
          if (selector != null) {
            indexedSelector = selector.replace("(i)", `(${i})`);
          }

          try {
            const data = result[j];
            if (data !== null && indexedSelector != null) {
              scrapedData[indexedSelector] = data.replace(/\n/g, ",");
            }
          } catch (error) {
            console.error(`Failed to scrape ${indexedSelector}: ${error}`);
          }
        }
      } else {
        const indexedSelectors = selectors.map((selector) =>
          selector.replace("(i)", `${i}`)
        );

        const elements = await Promise.all(
          indexedSelectors.map((selector) => page.$(selector))
        );

        const result = await Promise.all(
          elements.map(async (element) => {
            // Check if the element is not null before evaluating
            if (element) {
              return element.evaluate((node) => node.innerText);
            } else {
              return null; // or any other value you want to use for null elements
            }
          })
        );

        for (let j = 0; j < selectors.length; j++) {
          const selector = selectors[j];
          let indexedSelector;
          if (selector != null) {
            indexedSelector = selector.replace("(i)", `${i}`);
          }
          try {
            const data = result[j];
            if (data !== null && indexedSelector != null) {
              scrapedData[indexedSelector] = data.replace(/\n/g, ",");
            }
          } catch (error) {
            console.error(`Failed to scrape ${indexedSelector}: ${error}`);
          }
        }
      }
    }

    // await browser.close();
    const values = Object.values(scrapedData);
    console.log(values);
    const formattedData = values.map((string) => {
      return string.split(/\s/g).filter(Boolean).join("");
    });
    const result1 = formattedData.map((row) => row.replace(/,,/g, ","));
    const formattedResult = result1.map((selector, index) => {
      return { [index]: selector };
    });
    if (config.format === "json") {
      reply.send({ data: formattedResult });
    } else if (config.format === "csv") {
      reply.send({ data: result1 });
    } else {
      reply.send({ data: result1 });
    }
  } catch (error) {
    console.log("[ScapeError] ", error.message);
    reply.status(500).send({ error: error.message });
  } finally {
    // Make sure to close the browser outside the try-catch block
    if (browser) {
      await browser.close();
    }
  }
};

const onlineScrape = async (request, reply) => {
  let browser;
  try {
    console.log(request);
    const eiei = await DataServices.getDataById(request);
    const config = {
      url: eiei.url,
      dataset: eiei.dataset,
      data: eiei.data,
      format: eiei.format,
      filename: eiei.filename,
      startDate: eiei.startDate,
      endDate: eiei.endDate,
    };
    console.log(config);

    browser = await puppeteer.launch({
      headless: "new",
      ignoreHTTPSErrors: true,
      executablePath: `/usr/bin/chromium-browser`,
      args: [
        `--disable-gpu`,
        `--disable-setuid-sandbox`,
        `--no-sandbox`,
        `--no-zygote`,
      ],
    });
    const page = await browser.newPage();
    await page.goto(config.url, {
      waitUntil: "domcontentloaded",
    });

    let previousHeight = 0;
    let currentHeight = await page.evaluate("document.body.scrollHeight");

    while (previousHeight < currentHeight) {
      await page.evaluate("window.scrollTo(0, document.body.scrollHeight)");
      await page.waitForTimeout(2000);
      previousHeight = currentHeight;
      currentHeight = await page.evaluate("document.body.scrollHeight");
    }

    const scrapedData = {};
    const selectors = config.data;

    for (let i = 1; i <= config.dataset; i++) {
      const indexedSelectors = selectors.replace("(i)", `(${i})`);
      const element = await page.$(indexedSelectors);

      if (element) {
        try {
          const innerText = await element.evaluate((node) => node.innerText);
          scrapedData[indexedSelectors] = innerText.replace(/\n/g, ",");
        } catch (error) {
          console.error(
            `Failed to scrape ${indexedSelectors}: ${error.message}`
          );
        }
      } else {
        console.error(`Element not found: ${indexedSelectors}`);
      }
    }

    const values = Object.values(scrapedData);
    console.log(values);
    const formattedData = values.map((string) =>
      string.split(/\s/g).filter(Boolean).join("")
    );
    const result1 = formattedData.map((row) => row.replace(/,,/g, ","));

    if (config.format === "db") {
      console.log({ data: result1 });

      for (const stringValue of result1) {
        // Splitting the string using a comma as the delimiter
        const separatedValues = stringValue.split(",");
        const currentTimestamp = Date.now();

        // Check if the weather value is a percentage
        const isPercentage = separatedValues[4].includes("%");

        // Replace null values when the weather value is a percentage
        const weatherValue = isPercentage ? separatedValues[4] : "N/A";

        const modifiedValues = [...separatedValues];

        // Insert the modified weather value at index 4
        const conditon = isPercentage
          ? modifiedValues
          : modifiedValues.splice(4, 0, weatherValue);

        const dataAQ = {
          day: new Date(currentTimestamp).toLocaleDateString(),
          level: modifiedValues[1],
          AQI: Number(modifiedValues[2]),
          weather: weatherValue,
          max_temp: modifiedValues[5],
          min_temp: modifiedValues[6],
          wind: modifiedValues[7],
        };

        // Perform data creation for each set of data
        const createData = await prisma.$transaction(async (tx) => {
          const config = await tx.config.findUnique({
            where: { id: request },
          });
          const district = await tx.district.findUnique({
            where: { id: request },
          });
          const AQ = await tx.scraped.create({
            data: {
              ...dataAQ,
              configId: config.id,
              districtId: district.id,
            },
          });

          return AQ;
        });
      }
    }
  } catch (error) {
    console.log("[ScrapeError] ", error.message);
    reply.status(500).send({ error: error.message });
  } finally {
    if (browser) {
      await browser.close();
    }
  }
};

export default {
  scrape,
  onlineScrape,
};

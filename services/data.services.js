import { prisma } from "./prisma.client.js";

export const DataServices = {
  collectData: async (data) => {
    return await prisma.config.create({
      data: {
        url: data.url,
        dataset: data.dataset,
        data: data.data[0].selector,
        format: data.format,
        filename: data.filename,
        startDate: data.startTime,
        endDate: data.endTime,
      },
    });
  },

  getDataById: async (id) => {
    const data = await prisma.config.findFirst({
      where: { id: Number(id) },
    });

    return data;
  },

  getScrapedDataByConfigId: async (id) => {
    return await prisma.$transaction(async (tx) => {
      const data = await tx.config.findFirst({
        where: { id: Number(id) },
      });

      const scraped = await tx.scraped.findMany({
        where: { configId: data.id },
      });

      return scraped;
    });
  },

  getScrapedDataByDistrictId: async (id) => {
    return await prisma.$transaction(async (tx) => {
      const data = await tx.district.findFirst({
        where: { id: Number(id) },
      });

      const scraped = await tx.scraped.findMany({
        where: { districtId: data.id },
      });

      return scraped;
    });
  },

  getDataAll: async () => {
    const data = await prisma.config.findMany({});
    return data;
  },
};

import { prisma } from "./prisma.client.js";

export const DistrictServices = {
  addDistrict: async (data) => {
    const dis = await prisma.district.create({
      data: { name: data.name, lat: Number(data.lat), long: Number(data.long) },
    });
    return dis;
  },

  getDistrict: async () => {
    const dis = await prisma.district.findMany({});
    return dis;
  },
};

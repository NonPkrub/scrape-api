import { prisma } from "./prisma.client.js";

export const DistrictServices = {
  addDistrict: async (data) => {
    return await prisma.$transaction(async (tx) => {
      const dis = await tx.district.create({
        data: {
          name: data.name,
          lat: Number(data.lat),
          long: Number(data.long),
        },
      });

      const district = await tx.district.update({
        where: { id: dis.id },
        data: {
          configId: dis.id,
        },
      });
      return district;
    });
  },

  getDistrict: async () => {
    const dis = await prisma.district.findMany({});
    return dis;
  },
};

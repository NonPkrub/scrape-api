import { DataServices } from "../services/data.services.js";
import { fastifyLogError } from "../services/fastify.log.err.js";

const dataCollecting = async (req, reply) => {
  try {
    const { startDate, endDate, ...data } = req.body;

    const startTime = new Date(startDate);
    const endTime = new Date(endDate);

    const cd = await DataServices.collectData({
      ...data,
      startTime,
      endTime,
    });
    console.log(cd);
    reply.send({ message: "collect success" });
  } catch (err) {
    fastifyLogError({ message: "Internal Server Error" });
  }
};

const getData = async (req, reply) => {
  try {
    const { id } = req.params;
    const data = await DataServices.getDataById(id);

    reply.send(data);
  } catch (err) {
    fastifyLogError({ message: "Internal Server Error" });
  }
};

const getAllData = async (req, reply) => {
  try {
    const data = await DataServices.getDataAll();
    reply.send(data);
  } catch (err) {
    fastifyLogError({ message: "Internal Server Error" });
  }
};

const getScrapData = async (req, reply) => {
  try {
    const { id } = req.params;
    const data = await DataServices.getScrapedDataByConfigId(id);

    reply.send(data);
  } catch (err) {
    fastifyLogError({ message: "Internal Server Error" });
  }
};

const getDataByDistrictId = async (req, reply) => {
  try {
    const { id } = req.params;
    const data = await DataServices.getScrapedDataByDistrictId(id);

    reply.send(data);
  } catch (err) {
    fastifyLogError({ message: "Internal Server Error" });
  }
};
export default {
  dataCollecting,
  getData,
  getAllData,
  getScrapData,
  getDataByDistrictId,
};

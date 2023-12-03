import { DistrictServices } from "../services/district.services.js";

const initDistrict = async (req, reply) => {
  try {
    const district = await DistrictServices.addDistrict(req.body);
    reply.send(district);
  } catch (err) {
    reply.code(500).send({ message: "Internal Server Error" });
  }
};

const getDistrictData = async (req, reply) => {
  try {
    const district = await DistrictServices.getDistrict();
    console.log(district);
    reply.send(district);
  } catch (err) {
    reply.code(500).send({ message: "Internal Server Error" });
  }
};
export default {
  initDistrict,
  getDistrictData,
};

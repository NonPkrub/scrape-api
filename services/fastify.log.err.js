import server from "../index.js";

export const fastifyLogError = (req, err) => {
  server.app.log.error(err);
};

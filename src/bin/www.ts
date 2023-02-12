import http from "http";

import app from "../app";
import mongo from "../databases/mongo.db";
import { logger } from "../utils"; 

const server = http.createServer(app);
const _PORT = (process.env.APP_PORT || 3000) as number;

Promise.all([mongo])
  .then(() => {
    server.listen(_PORT, () => logger.info(`[::]:${_PORT}`));
  })
  .catch((err) => logger.fatal(err));

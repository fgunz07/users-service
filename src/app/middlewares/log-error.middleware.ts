import { Request, Response, NextFunction } from "express";

import { RequestError, ServiceError, DALError } from "../components/error";
import { logger } from "../../utils";

const logError = (
  error: any,
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  const rand = Math.floor(Math.random() * 1000000000);

  const r = {
    id: rand,
    type: error.name,
    body: req.body,
    params: req.params,
    query: req.query,
    method: req.method,
    path: req.path,
    data: { message: error.message, data: error.data },
    date: Date.now(),
  };

  switch(true) {
    case error instanceof RequestError:
      logger.warn(JSON.stringify(r));
      break;
    case error instanceof ServiceError:
      logger.error(JSON.stringify(r));
      break;
    case error instanceof DALError:
      logger.fatal(JSON.stringify(r));
      break;
  }

  next(error);
};

export default logError;

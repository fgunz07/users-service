import { Request, Response, NextFunction } from "express";

import { logger } from "../../utils";

const logError = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  const rand = Math.floor(Math.random()*1000000000);

  const r = {
    id: rand,
    type: "Request",
    body: req.body,
    params: req.params,
    query: req.query,
    method: req.method,
    path: req.path,
    data: {},
    date: Date.now(),
  };

  logger.info(JSON.stringify(r));

  next();

  r.date = Date.now();

  logger.info(JSON.stringify(r));
};

export default logError;

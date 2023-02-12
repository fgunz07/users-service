import { Request, Response, NextFunction } from "express";
import { ServiceError, DALError, RequestError } from "./error";
import STATUSES from "../enums/status.enum";

export function serviceTry(cb: Function) {
  try {
    return cb();
  } catch (error: any) {
    throw new ServiceError(error.message, error.constructor.name, "");
  }
}

export function dalTry(cb: Function) {
  try {
    return cb();
  } catch (error: any) {
    throw new DALError(error.message);
  }
}

export function controllerTry(cb: Function) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      return await cb(req, res);
    } catch (error: any) {
      if (error instanceof DALError) {
        error = new RequestError(error.message, STATUSES.BAD_REQUEST, "");
      }

      if (error instanceof ServiceError) {
        error = new RequestError(error.message, STATUSES.SERVER_ERROR, "");
      }
      next(error);
    }
  };
}

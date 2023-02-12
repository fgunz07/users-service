import { Request, Response, NextFunction } from "express";

const handle = (error: any, _: Request, res: Response, _next: NextFunction) => {
  return res
    .status(error.status)
    .send({ message: error.message, data: JSON.parse(error.data) });
};

export default handle;

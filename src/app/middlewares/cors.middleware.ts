import { Request, Response, NextFunction } from "express";

const cors = (_: Request, res: Response, next: NextFunction) => {
  res.setHeader("access-control-allow-origin", "*");
  res.setHeader(
    "access-control-allow-methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  res.setHeader(
    "access-control-allow-headers",
    "Accept, Content-Type, Authorization"
  );
  next();
};

export default cors;

import { Request, Response } from "express";
import { validationResult } from "express-validator";

import STATUSES from "../../../enums/status.enum";
import { RequestError } from "../../error";
import * as userService from "./user.service";
import { serviceTry } from "../../catch";

export function index(
  req: Request,
  res: Response
): Response {
  return serviceTry(async () => {
    const limit = (req.query.limit || 10) as number;
    const currentPage = (req.query.page || 1) as number;

    const users = await userService.index(limit, currentPage);
    return res.status(STATUSES.OK).send(users);
  });
}

export function store(
  req: Request,
  res: Response
): Response {
  return serviceTry(async () => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new RequestError(
        "Invalid request",
        STATUSES.UNPROCESSABLE,
        JSON.stringify(errors.mapped())
      );
    }

    const user = await userService.store(req.body);
    return res.status(STATUSES.CREATED).send(user);
  });
}

export function find(
  req: Request,
  res: Response
): Response {
  return serviceTry(async () => {
    const user = await userService.find(req.params.id);
    return res.status(STATUSES.OK).send(user);
  });
}

export function update(
  req: Request,
  res: Response
): Response {
  return serviceTry(async () => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new RequestError(
        "Invalid request",
        STATUSES.UNPROCESSABLE,
        JSON.stringify(errors.mapped())
      );
    }
    
    const user = await userService.update(req.params.id, req.body);
    return res.status(STATUSES.OK).send(user);
  });
}

export function del(
  req: Request,
  res: Response
): Response {
  return serviceTry(async () => {
    const user = await userService.del(req.params.id);
    return res.status(STATUSES.OK).send(user);
  })
}

import { Request, Response, NextFunction } from "express";

import STATUSES from "../enums/status.enum";

const permission =
  (p: string) => (req: Request, res: Response, next: NextFunction) => {
    const user = req.user as { modules: string[] };

    if (!user.modules.includes(p)) {
      return res.sendStatus(STATUSES.FORBIDDEN);
    }

    next();
  };

export default permission;

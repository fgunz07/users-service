import express, { Express, Response, Request } from "express";
import passport from "passport";

import userRouter from "./components/v1/users/user.api";
import corsMiddleware from "./middlewares/cors.middleware";
import handleMiddleware from "./middlewares/handle.middeware";
import logErrorMiddleware from "./middlewares/log-error.middleware";
import logRequestMiddleware from "./middlewares/log-request.middleware";

import access from "./middlewares/passport/access.middleware";

const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());
passport.use(access);

app.use(corsMiddleware);
app.use(logRequestMiddleware);

app.get("/healthcheck", (_: Request, res: Response) => {
  res.sendStatus(200);
});
app.use("/v1", passport.authenticate("jwt", { session: false }), userRouter);
app.use("*", (_: Request, res: Response) => {
  return res.sendStatus(404);
});

app.use(logErrorMiddleware);
app.use(handleMiddleware);

export default app;

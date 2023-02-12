import express, { Router } from "express";

import * as userController from "./user.controller";
import checkSchema from "./user.schema";
import { controllerTry } from "../../catch";

const router: Router = express.Router();

router
  .route("/users")
  .get(controllerTry(userController.index))
  .post(checkSchema, controllerTry(userController.store));

router
  .route("/users/:id")
  .get(controllerTry(userController.find))
  .put(checkSchema, controllerTry(userController.update))
  .delete(controllerTry(userController.del));

export default router;

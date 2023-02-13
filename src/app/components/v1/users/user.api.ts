import express, { Router } from "express";

import * as userController from "./user.controller";
import checkSchema from "./user.schema";
import permission from "../../../middlewares/permission.middleware";
import { controllerTry } from "../../catch";

const router: Router = express.Router();

router
  .route("/users")
  .get(permission("user.index"), controllerTry(userController.index))
  .post(permission("user.store"), checkSchema, controllerTry(userController.store));

router
  .route("/users/:id")
  .get(permission("user.find"), controllerTry(userController.find))
  .put(permission("user.update"), checkSchema, controllerTry(userController.update))
  .delete(permission("user.delete"), controllerTry(userController.del));

export default router;

import express from "express";
const route = express.Router();
import {
  controllerCreateUser,
  controllerGetAll,
  controllerChangePassword,
} from "../controller/signUpController.js";

import { hashPassword } from "../middleware/aboutPassword.js";

route.post("/createUser", hashPassword, controllerCreateUser); // route for create user.

route.get("/getAll", controllerGetAll); // route for getting all users.

route.patch("/changePassword", controllerChangePassword); // route for update user.

export default route;

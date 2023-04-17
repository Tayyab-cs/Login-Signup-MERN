import express from "express";
const route = express.Router();
import {
  controllerLogin,
  controllerForgetPassword,
  controllerResetPassword,
} from "../controller/loginController.js";
import { comparePassword } from "../middleware/aboutPassword.js";

route.post("/createUser", comparePassword, controllerLogin);

route.post("/forgetPassword", controllerForgetPassword);

route.patch("/resetPassword", controllerResetPassword);

export default route;

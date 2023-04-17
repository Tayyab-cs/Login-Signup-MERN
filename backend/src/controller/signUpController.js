import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";
import userSchema from "../database/model/userModel.js";
import {
  validateSignUp,
  validateUpdatePassword,
} from "../validation/schemaValidation.js";
import {
  serviceCreateUser,
  serviceGetAll,
  serviceFindUser,
  serviceUpdateUser,
} from "../services/signUpService.js";
import bcrypt from "bcrypt";

const controllerCreateUser = async (req, res) => {
  try {
    const { err, value } = await validateSignUp.validate(req.body); // validating request body data from client side.

    if (err) res.status(400).json({ errorMessage: err.message });
    const { name, email, password } = value; // destructuring data from the validated value.
    const data = new userSchema({
      name,
      email,
      password,
    }); // creating new document to store in the DB.
    const result = await serviceCreateUser(data); // calling the create method.

    // creating jwt token and setting it in the header.
    const payload = {
      name: req.body.name,
    };
    const secret = process.env.SECRET_KEY;
    const token = jwt.sign(payload, secret);
    // res.set("Authorization", `Bearer ${token}`);
    res.cookie("jwtToken", token, { maxAge: 3600000, httpOnly: true }); // 1h = 3600000ms

    res.status(201).json({ message: `successful`, result, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ errorMessage: error.message });
  }
};

const controllerGetAll = async (req, res) => {
  try {
    const result = await serviceGetAll(); // calling the find method to getAll users from DB.
    console.log(result);
    res.status(201).json({ message: `successful`, result });
  } catch (error) {
    console.log(error);
    res.status(500).json({ errorMessage: error.message });
  }
};

const controllerChangePassword = async (req, res) => {
  try {
    const { err, value } = await validateUpdatePassword.validate(req.body); // validating request body data from client side.

    if (err) res.status(400).json({ errorMessage: err.message });
    const { email, oldPassword, newPassword } = value; // destructuring data from the validated value.

    // creating paramters to pass to updateOne method.
    const filter = { email };
    const update = { password: newPassword };
    const option = { new: true };

    const findEmail = await serviceFindUser(email); // find email in DB.
    if (!findEmail) res.status(400).json({ message: "Email not Found." });
    else {
      const compareOldPassword = await bcrypt.compare(
        oldPassword,
        findEmail.password
      ); // comparing hashed password.

      if (!compareOldPassword)
        res.status(400).json({ message: "Old Password not Matched." });
      else {
        await serviceUpdateUser(filter, update, option); // calling the updateOne method.
        await findEmail.save(); // saving the changings in the founded email.
        res.status(201).json({ message: `Password Changed Successfully` });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ errorMessage: error.message });
  }
};

export { controllerCreateUser, controllerGetAll, controllerChangePassword };

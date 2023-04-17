import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";
import {
  validateLogin,
  validateEmail,
  validatePassword,
} from "../validation/schemaValidation.js";
import {
  serviceFindEmail,
  serviceFindId,
  serviceResetPassword,
} from "../services/loginService.js";
import bcrypt from "bcrypt";
import sendEmail from "../utils/sendEmail.js";

const controllerLogin = async (req, res) => {
  console.log(
    "<<===================== Logging User API =======================>>"
  );

  try {
    const { err, value } = await validateLogin.validate(req.body); // validating request body data from client side.

    if (err) res.status(400).json({ errorMessage: err.message });
    const { email, password } = value; // destructuring data from the validated value.
    const findEmail = await serviceFindEmail(email); // find email in DB.
    console.log(findEmail._id);

    if (!findEmail) res.status(400).json({ Message: "Email not Found." });
    else {
      // const comparePassword = await bcrypt.compare(
      //   password,
      //   "$2b$10$7F2iEsAi7QvIIcwciExw..YUEXleTVZoaxX1Ah9NNn1NIpWvzVuES"
      // ); // comparing the hashed password.
      // console.log(password);
      // console.log(findEmail.password);
      // console.log(comparePassword);

      if (
        password ===
        "$2b$10$7F2iEsAi7QvIIcwciExw..YUEXleTVZoaxX1Ah9NNn1NIpWvzVuES"
      ) {
        console.log(`password matched`);
      }

      // if (!comparePassword) {
      //   console.log("Password not Matched.");
      //   res.status(400).json({ Message: "Invalid Credentials." });
      // } else {
      //   console.log("Password Matched Successfully.");

      // creating jwt token and setting it in the header.
      const payload = {
        id: findEmail._id,
      };
      console.log(payload.id);
      const secret = process.env.SECRET_KEY;
      const token = jwt.sign(payload, secret);
      // res.set("Authorization", `Bearer ${token}`);
      res.cookie("jwtToken", token, { maxAge: 3600000, httpOnly: true }); // 1h = 3600000ms
      console.log("Login Successful.");

      // sending response back to the client.
      res.status(201).json({
        message: `Login Successful`,
        timestamp: new Date().toISOString(),
        token,
      });
      // }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ errorMessage: error.message });
  }
};

const controllerForgetPassword = async (req, res) => {
  console.log(
    "<<===================== FORGET PASSWORD API =======================>>"
  );
  try {
    const { err, value } = await validateEmail.validate(req.body);

    if (err) res.status(400).json({ errorMessage: err.message });
    else {
      const { email } = value;
      console.log(email);
      const findEmail = await serviceFindEmail(email); // find email in DB.

      if (!findEmail) res.status(400).json({ Message: "Email not Found." });
      else {
        // creating jwt token and setting it in the header.
        const payload = {
          id: findEmail._id,
        };
        console.log(payload.id);
        const secret = process.env.SECRET_KEY;
        const token = jwt.sign(payload, secret);
        // res.set("Authorization", `Bearer ${token}`);
        res.cookie("jwtToken", token, { maxAge: 3600000, httpOnly: true }); // 1h = 3600000ms
        console.log("Token Created Successfully...");

        const link = `${process.env.BASE_URI}/resetPassword?token=${token}`; // creating navigation link which will send to your email for reset password.
        sendEmail(email, "RESET PASSWORD", link); // calling the sendEmail method.
        res.status(201).json({
          message: `reset password details sent to your email. kindly check your email.`,
        });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ errorMessage: error.message });
  }
};

const controllerResetPassword = async (req, res) => {
  console.log(
    "<<===================== RESET PASSWORD API =======================>>"
  );
  try {
    const authHeader = req.headers.authorization;
    // console.log(req.headers);
    console.log(authHeader);

    if (!authHeader) res.status(400).json({ message: `Token not found.` });
    else {
      const token = authHeader.split(" ")[1]; // Getting Token
      console.log(`Token: ${token}`);
      const decode = jwt.verify(token, process.env.SECRET_KEY); // Decoding info from the Token.
      console.log(`Token Decoded Successfully: ` + decode);

      const { id } = decode;
      console.log(id);
      const findId = await serviceFindId(id); // find the token decoded ID in DB.
      console.log(findId);

      if (!findId) res.status(400).json({ message: `User ID not found.` });
      else {
        console.log(req.body);
        const { err, value } = await validatePassword.validate(req.body); // validating the newPassword from req body.

        if (err)
          res
            .status(400)
            .json({ message: `Invalid Password`, errorMessage: err.message });
        else {
          const { newPassword } = value; // destructuring newPassword from req body.
          console.log(`NEW PASSWORD: ${newPassword}`);

          // creating paramters to pass to updateOne method.
          const filter = { _id: id };
          const update = { password: newPassword };
          const option = { new: true };
          console.log(filter._id);

          await serviceResetPassword(filter, update, option); //calling the updateOne method.
          await findId.save(); // saving the updated password against the finded id.
          res.status(201).json({ message: `Password Reset Successfully 🌝` });
        }
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ errorMessage: error.message });
  }
};

export { controllerLogin, controllerForgetPassword, controllerResetPassword };

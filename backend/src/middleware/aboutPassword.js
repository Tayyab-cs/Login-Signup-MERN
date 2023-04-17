import bcrypt from "bcrypt";
import userModel from "../database/model/userModel.js";

const hashPassword = async (req, res, next) => {
  console.log(
    "<<===================== Middleware Hash Password =======================>>"
  );
  try {
    const password = req.body.password;
    const saltRound = 11;
    const hashedPassword = await bcrypt.hash(password, saltRound);
    console.log(`Password: ${password}`);
    console.log(`HashedPassword: ${hashedPassword}`);

    req.body.password = hashedPassword;
    console.log(`Know req.body.password : ${req.body.password}`);

    next();
  } catch (error) {
    console.error(`Error hashing password: ${error}`);
    return next(error);
  }
};

const comparePassword = async (req, res, next) => {
  console.log(
    "<<===================== Middleware Compare Password =======================>>"
  );
  try {
    const { email, password } = req.body;
    console.log(`Email: ${email}`);
    console.log(`Password: ${password}`);

    const user = await userModel.findOne({ email });
    console.log(`Find User: ${user}`);

    const hashedPassword = user.password;
    const passwordMatch = await bcrypt.compare(password, hashedPassword);

    if (!passwordMatch) res.status(401).json({ error: "Invalid password" });
    next();
  } catch (error) {
    console.error(`Error Comparing password: ${error}`);
    return next(error);
  }
};

export { hashPassword, comparePassword };

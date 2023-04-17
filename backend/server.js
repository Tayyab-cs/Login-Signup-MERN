/* ---------------------------- packages --------------------------- */
import express from "express";
const app = express();
import cors from "cors";
import signuprouter from "./src/routes/signUpRoutes.js";
import loginrouter from "./src/routes/loginRoutes.js";

/* ---------------------------- PORT Access --------------------------- */
import dotenv from "dotenv";
dotenv.config();
const PORT = process.env.PORT || 3000;

/* ---------------------------- Calling Database --------------------------- */
import { dbConnection } from "./src/database/connect.js";
dbConnection();

/* ---------------------------- Middlewares --------------------------- */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/api/signup", signuprouter);
app.use("/api/login", loginrouter);

app.get("/", (req, res) => {
  res.send(`Welcome to my App.`);
});

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});

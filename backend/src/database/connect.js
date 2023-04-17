import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const dbConnection = () => {
  mongoose.connect(process.env.URI_ATLAS, {
    useNewUrlParser: true,
  });

  const db = mongoose.connection;

  db.on("error", (error) => {
    console.log(error);
  });

  db.once("connected", () => {
    console.log("DataBase connected Successfully.");
  });
};

export { dbConnection };

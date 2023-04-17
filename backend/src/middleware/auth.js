import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const verifyToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log(authHeader);

  if (!authHeader) {
    return res.status(400).json({ message: "Auth header not Found!" });
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(400).json({ message: "Token not Found!" });
  }

  const secretKey = process.env.SECRET_KEY;
  const { err, decoded } = await jwt.verify(token, secretKey);
  if (err) {
    return res.status(400).json({ message: "Token not Verified!" });
  }
  //   console.log(`DECODED: ${decoded}`);
  req.user = decoded;
  next();
};

export default verifyToken;

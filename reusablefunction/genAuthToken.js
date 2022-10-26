import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

export const genAuthToken = (id) => {
   return jwt.sign({ id }, process.env.Access_Secret_Token, {expiresIn : "30days"});
}
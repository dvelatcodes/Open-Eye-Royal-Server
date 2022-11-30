import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
const app = express();
// if (app.get("env") !== "production")
dotenv.config();
const db = process.env.db;
import router from "./routes/index.js";

const PORT = process.env.PORT || 5000;
app.use(
  cors({
    origin: "https://client-open-eye-royal-dvelatcodes.vercel.app",
  })
);
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));

app.use("/", router);

// welcome endpoint
app.get("/", (req, res) => {
  res.status(200).send("Welcome to open royal api");
});

// wrong route endpoint
app.get("*", (req, res) => {
  res.status(404).send("404 Not found");
});

mongoose
  .connect(db, { useNewUrlParser: true }, { useUnifiedTopology: true })
  .then(() => {
    app.listen(PORT, () => {
      console.log(
        `database connected successfully and server running on ${PORT}`
      );
    });
  })
  .catch((err) => {
    console.log(err);
  });

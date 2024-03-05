import express from "express";
import http from "http";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import router from "./router";

dotenv.config();

// Setup Express Server
const app = express();
app.use(
  cors({
    credentials: true,
  })
);
app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

const server = http.createServer(app);
server.listen(8080, () => {
  console.log("Server running on http://localhost:8080/");
});

// Setup MongoDB
const MONGO_URL = process.env.MONGO_URL;

mongoose.connect(MONGO_URL);
mongoose.connection.on("error", (error: Error) => {
  console.log(error);
});

// router
app.use("/", router());
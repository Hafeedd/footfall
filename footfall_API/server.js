import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import http from "http";

import { initializeSocket } from "./socket/socketSvc.js";
import footfallRoutes from "./Routes/rFootfall.js";

dotenv.config();

const app = express();
const PORT = 8080;
const MONGO_URI = process.env.MONGO;

const server = http.createServer(app);

const connect = async () => {
  await mongoose.connect(MONGO_URI);
  console.log("connected to database");
};

// middleware ----

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

initializeSocket(server);

app.use("/", footfallRoutes);

// middlewre for handling errors
app.use((err, req, res, next) => {
  console.log(err);
  res.status(err?.status || 500).json(err);
});

server.listen(PORT, (err) => {
  if (err) console.log(err);
  connect();
  console.log("Backend is running on port: " + PORT);
});

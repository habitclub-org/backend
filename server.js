import http from "http";
import express from "express";
import dotenv from "dotenv";
import prisma from "./prisma";
import cors from "cors";
import router from "./routers";

dotenv.config();

const PORT = 8000;
const app = express();
const server = http.createServer(app);

app.use(express.json());
app.use(cors());
app.use(router);

const logRequestStart = (req, res, next) => {
  console.info(`${req.method}, ${req.headers.authorization}`);
  next();
};

app.use(logRequestStart);

const start = async () => {
  try {
    server.listen(PORT, () => {
      console.log(`Server is listening on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.log(err);
    await prisma.$disconnect();
  }
};

start();

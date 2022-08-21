import http from "http";
import dotenv from "dotenv";
import prisma from "./prisma";
import createApp from "./app";

dotenv.config();

const PORT = process.env.PORT;

const app = createApp()
const server = http.createServer(app);

const start = async () => {
  try {
    server.listen(PORT, () => {
      console.log(`Server is listening on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.log(err);
    await prisma.$disconnect();
    return res.status(err.statusCode || 500).json({ message: err.message })
  }
};

start();

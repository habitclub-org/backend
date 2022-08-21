import express from "express";
import cors from "cors";
import router from "./routers";

const createApp = () => {
  const app = express();

  app.use(express.json());
  app.use(router);
	app.use(cors());

	const logRequestStart = (req, res, next) => {
		console.info(`${req.method}, ${req.headers.authorization}`)
		next();
	};

	app.use(logRequestStart);

  return app;
};

export default createApp;
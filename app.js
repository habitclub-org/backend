import express from "express";
import cors from "cors";
import router from "./routers";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express"
import swaggerDocument from "./swagger.json"

const createApp = () => {
  const app = express();

  app.use(express.json());

	app.use(
		"/api-docs",
		swaggerUi.serve,
		swaggerUi.setup(swaggerDocument, { explorer: true })
	)

  app.use(router);
	app.use(cors());

	const logRequestStart = (req, res, next) => {
		console.info(`${req.method}, ${req.headers.token}`)
		next();
	};

	app.use(logRequestStart);

  return app;
};

export default createApp;
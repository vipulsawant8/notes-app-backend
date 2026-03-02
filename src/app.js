import e, { json, urlencoded, static as static_ } from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import logger from "./utils/logger.js";

import authRoutes from "./routes/auth.routes.js";
import noteRoutes from "./routes/note.routes.js";

import errorHandler from './middlewares/error/errorHandler.middleware.js';

const app = e();

app.disable('x-powered-by');
app.set("trust proxy", 1);

const allowedOrigins = process.env.CORS_ORIGIN.split(',');
logger.info({ allowedOrigins }, "CORS configuration loaded");

const corsOptions = {
	origin: function (origin, callback) {
		logger.debug({ requestOrigin: origin }, "Incoming CORS origin check");
		if (!origin) return callback(null, true);
		if (allowedOrigins.indexOf(origin) === -1) {
			const msg = `The CORS policy for this site does not allow access from the specified Origin.`;
			return callback(new Error(msg), false);
		}
		return callback(null, true);
	},
	methods: ["GET", "POST", "PATCH", "PUT", "DELETE"],
	credentials: true
};

const urlOptions = {
	limit: "50mb",
	extended: true
};

const jsonOptions = {
	limit: "50mb"
};

app.use(cors(corsOptions));

app.use(json(jsonOptions));
app.use(urlencoded(urlOptions));
app.use(static_("public"));

app.use(cookieParser());

app.use((req, res, next) => {
  logger.info(
    {
      method: req.method,
      url: req.originalUrl,
      ip: req.ip
    },
    "Incoming request"
  );
  next();
});

const apiRoute = '/api/v1';

app.use(`${apiRoute}/auth`, authRoutes);
app.use(`${apiRoute}/notes`, noteRoutes);

app.use((req, res) => {
	logger.warn(
		{ method: req.method, url: req.originalUrl },
		"Route not found"
	);
	res.status(404).json({ message: "Route not found", success: false });
});

app.use(errorHandler);

export default app;
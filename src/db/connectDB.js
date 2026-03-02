import { connect } from "mongoose";
import User from "../models/user.model.js";
import Note from "../models/notes.model.js";
import logger from "../utils/logger.js";

const connectDB = async () => {

	try {

		const DB_PATH = process.env.DB_CONNECT_STRING;

		if (!DB_PATH) {
			throw new Error("DB_CONNECT_STRING is not defined in environment variables");
		}

		const conn = await connect(DB_PATH);

		logger.info(
		{
			host: conn.connection.host,
			dbName: conn.connection.name
		},
		"MongoDB connected successfully"
		);
		logger.debug(
        {
          collections: Object.keys(conn.connection.collections)
        },
        "MongoDB collections loaded"
      );

		await User.syncIndexes();
		await Note.syncIndexes();

    logger.info("Database indexes synced successfully");
	} catch (error) {
		
		logger.fatal({ err: error }, "MongoDB connection failed");
    	throw error;
	}
};

export default connectDB;
import './loadEnv.js';

import app from './app.js';
import connectDB from './db/connectDB.js';
import logger from './utils/logger.js';

const initiateServer = async () => {
	
	try {
    	logger.info("Server initialization started");

		await connectDB();
    	logger.info("Database connected successfully");

		const PORT = process.env.PORT;
		app.listen(PORT, () => {

			logger.info({ port: PORT }, "Server running successfully");
		});
	} catch (error) {
		
		logger.fatal({ err: error }, "Server failed to start");
    	process.exit(1);	
	}
};

initiateServer();
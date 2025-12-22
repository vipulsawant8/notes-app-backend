import { connect } from "mongoose";
// import User from "../models/user.model.js";
import Note from "../models/user.model.js";

const connectDB = async () => {

	try {

		const DB_PATH = process.env.DB_CONNECT_STRING;

		if (!DB_PATH) {
			throw new Error("DB_CONNECT_STRING is not defined in environment variables");
		}

		const conn = await connect(DB_PATH);

		if (process.env.NODE_ENV !== "production") {
	
			console.log("MongoDB connected");
			console.log('host :', conn.connection.host);
			console.log("dbName :", conn.connection.name);
			console.log("collections :", Object.keys(conn.connection.collections));
		}

		// await User.syncIndexes();
		await Note.syncIndexes();
	} catch (error) {
		
		console.log("MongoDB Connection Error :", error);
		process.exit(1);
	}
};

export default connectDB;
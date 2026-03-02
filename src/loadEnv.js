import dotenvFlow from "dotenv-flow";
import logger from "./utils/logger.js";

dotenvFlow.config({
	node_env: process.env.NODE_ENV || "development",
	default_node_env: "development",
	silent: false
});

logger.info(
  { nodeEnv: process.env.NODE_ENV },
  "Environment configuration loaded"
);
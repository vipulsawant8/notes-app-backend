import dotenvFlow from "dotenv-flow";

dotenvFlow.config({
	node_env: process.env.NODE_ENV || "development",
	default_node_env: "development",
	silent: false
});

console.log(`Environment loaded → NODE_ENV=${process.env.NODE_ENV}`);

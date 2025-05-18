const app = require("./app");
const config = require("./config");
const logger = require("./utils/logger");

const server = app.listen(config.port, () => {
  logger.info(`Server running on port ${config.port}`);
});

process.on("unhandledRejection", (error) => {
  logger.error("Unhandled Rejection:", error);
  server.close(() => process.exit(1));
});

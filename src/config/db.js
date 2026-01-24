import { Sequelize } from "sequelize";
import dotenv from "dotenv";
import { myLogs } from "../utils/myLogs.js";

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "mysql",
    logging: false,
  }
);

(async () => {
  try {
    await sequelize.authenticate();
    myLogs("✅", "Sequelize connected to DB");
  } catch (error) {
    myLogs("❌", `Sequelize error: ${error.message}`);
  }
})();

export default sequelize;
import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Loan = sequelize.define(
  "Loan",
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },

    userId: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    bookId: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    loanDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },

    returnDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },

    status: {
      type: DataTypes.ENUM("borrowed", "returned"),
      defaultValue: "borrowed",
    },
  },
  {
    tableName: "loans",
    timestamps: true,
  }
);

export default Loan;
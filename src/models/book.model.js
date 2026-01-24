import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Book = sequelize.define(
  "Book",
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },

    isbn: {
      type: DataTypes.STRING(30),
      allowNull: false,
      unique: true,
    },

    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    status: {
      type: DataTypes.ENUM("available", "unavailable"),
      defaultValue: "available",
    },

    author: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    tableName: "books",
    timestamps: true,
  }
);

export default Book;
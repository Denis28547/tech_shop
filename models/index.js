import { DataTypes, Sequelize } from "sequelize";

const sequelize = new Sequelize({
  username: "postgres",
  password: "2562",
  database: "tech_shop",
  host: "127.0.0.1",
  dialect: "postgres",
});

// CREATE TABLE "user" (
// 	id SERIAL PRIMARY KEY,
// 	username VARCHAR(255) NOT NULL,
// 	email VARCHAR(255) UNIQUE NOT NULL,
// 	password TEXT NOT NULL,
// 	role VARCHAR(255) DEFAULT 'USER'
// );

const User = sequelize.define(
  "user",
  {
    user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "USER",
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

User.sync({ force: true });

export default sequelize;

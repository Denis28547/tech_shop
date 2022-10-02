import { DataTypes, Sequelize, Model } from "sequelize";

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

// const User = sequelize.define(
//   "user",
//   {
//     user_id: {
//       type: DataTypes.INTEGER,
//       primaryKey: true,
//       autoIncrement: true,
//     },
//     username: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     email: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       unique: true,
//     },
//     password: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     role: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       defaultValue: "USER",
//     },
//   },
//   {
//     freezeTableName: true,
//     timestamps: false,
//   }
// );

// User.sync({ force: true });

// export { User };
interface IUser extends Model {
  id: string;
  name: string;
  email: string;
  password: string;
  image: string | null;
  email_verified: boolean | null;
}

const User = sequelize.define<IUser>(
  "user",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      // allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      // allowNull: false,
    },
    email_verified: {
      type: DataTypes.DATE,
    },
  },
  {
    // freezeTableName: true,
    timestamps: false,
  }
);

// const Account = sequelize.define("account", {
//   user_id:{
//     type: DataTypes.STRING,

//   },
//   type: {
//     type: DataTypes.STRING,
//   },
//   provider: {
//     type: DataTypes.STRING,
//   },
//   provider_account_id: {
//     type: DataTypes.STRING,
//   },
//   refresh_token:{}

// },
// {
//   timestamps: false,
// })

export { User };
export default sequelize;

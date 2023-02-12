import { DataTypes, Sequelize } from "sequelize";

import { ICategoryModel, IItemModel, IUserModel } from "../types/index";
require("pg");

const PGUSER = process.env.PGUSER as string;
const PGPASSWORD = process.env.PGPASSWORD as string;
const PGDATABASE = process.env.PGDATABASE as string;
const DATABASE_URL = process.env.DATABASE_URL as string;
const PGPORT = process.env.PGPORT as string;

export const sequelize = new Sequelize({
  username: PGUSER!,
  password: PGPASSWORD,
  database: PGDATABASE,
  host: DATABASE_URL,
  port: Number(PGPORT),
  dialect: "postgres",
});

export const User = sequelize.define<IUserModel>(
  "user",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUID,
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
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
    },
    image: {
      type: DataTypes.STRING,
    },
    role: {
      type: DataTypes.STRING,
      defaultValue: "USER",
    },
    activationLink: {
      type: DataTypes.STRING,
    },
    isActivated: {
      type: DataTypes.BOOLEAN,
    },
    email_verified: {
      type: DataTypes.DATE,
    },
    createdAt: {
      type: DataTypes.DATE,
    },
  },
  {
    timestamps: true,
    updatedAt: false,
    tableName: "users",
  }
);

export const Account = sequelize.define(
  "account",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    type: {
      type: DataTypes.TEXT,
    },
    user_id: {
      type: DataTypes.TEXT,
    },
    provider: {
      type: DataTypes.TEXT,
    },
    provider_account_id: {
      type: DataTypes.TEXT,
    },
    refresh_token: {
      type: DataTypes.TEXT,
    },
    access_token: {
      type: DataTypes.TEXT,
    },
    expires_at: {
      type: DataTypes.INTEGER,
    },
    token_type: {
      type: DataTypes.TEXT,
    },
    scope: {
      type: DataTypes.TEXT,
    },
    id_token: {
      type: DataTypes.TEXT,
    },
    session_state: {
      type: DataTypes.TEXT,
    },
    oauth_token_secret: {
      type: DataTypes.TEXT,
    },
    oauth_token: {
      type: DataTypes.TEXT,
    },
  },
  {
    timestamps: false,
    tableName: "accounts",
  }
);

export const Rating = sequelize.define(
  "rating",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    rate: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  {
    timestamps: false,
    tableName: "ratings",
  }
);

export const Category = sequelize.define<ICategoryModel>(
  "category",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    backgroundColor: {
      type: DataTypes.STRING,
      unique: false,
      allowNull: false,
    },
  },
  {
    timestamps: false,
    tableName: "categories",
  }
);

export const Item = sequelize.define<IItemModel>(
  "item",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(90),
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    images: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    phone_number: {
      type: DataTypes.STRING(12),
      allowNull: true,
      defaultValue: null,
    },
  },
  {
    timestamps: true,
    tableName: "items",
  }
);

User.hasMany(Rating, {
  foreignKey: {
    allowNull: false,
    name: "rating_id",
  },
});
Rating.belongsTo(User, {
  foreignKey: {
    allowNull: false,
    name: "rating_id",
  },
});

User.hasMany(Item, {
  foreignKey: {
    allowNull: false,
    name: "user_id",
  },
});
Item.belongsTo(User, {
  foreignKey: {
    allowNull: false,
    name: "user_id",
  },
});

User.belongsToMany(Item, {
  as: "favorite",
  through: "favorites",
  foreignKey: "user_id",
  timestamps: false,
});
Item.belongsToMany(User, {
  through: "favorites",
  foreignKey: "item_id",
  timestamps: false,
});

Category.hasMany(Item, {
  foreignKey: {
    allowNull: false,
    name: "category_id",
  },
});
Item.belongsTo(Category, {
  foreignKey: {
    allowNull: false,
    name: "category_id",
  },
});

// "use strict";

// const fs = require("fs");
// const path = require("path");
// const Sequelize = require("sequelize");
// const process = require("process");
// const basename = path.basename(__filename);
// const env = process.env.NODE_ENV || "development";
// const config = require(__dirname + "/../config/config.js")[env];
// const db = {};

// let sequelize;

// if (config.use_env_variable) {
//   sequelize = new Sequelize(process.env[config.use_env_variable], config);
// } else {
//   sequelize = new Sequelize(
//     config.database,
//     config.username,
//     config.password,
//     config
//   );
// }

// fs.readdirSync(__dirname)
//   .filter((file) => {
//     console.log(file);
//     return (
//       file.indexOf(".") !== 0 &&
//       file !== basename &&
//       file.slice(-3) === ".ts" &&
//       file.indexOf(".test.ts") === -1
//     );
//   })
//   .forEach((file) => {
//     const model = require(path.join(__dirname, file))(
//       sequelize,
//       Sequelize.DataTypes
//     );
//     db[model.name] = model;
//   });

// Object.keys(db).forEach((modelName) => {
//   if (db[modelName].associate) {
//     db[modelName].associate(db);
//   }
// });

// db.sequelize = sequelize;
// db.Sequelize = Sequelize;

// module.exports = db;1

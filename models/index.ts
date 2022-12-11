import { DataTypes, Sequelize } from "sequelize";

import { ICategoryModel, IItemModel, IUserModel } from "../types/index";

const sequelize = new Sequelize({
  username: "postgres",
  password: "2562",
  database: "tech_shop",
  host: "127.0.0.1",
  dialect: "postgres",
});

export const User = sequelize.define<IUserModel>(
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
  },
  {
    timestamps: false,
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

export default sequelize;

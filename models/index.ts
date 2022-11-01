import { DataTypes, Sequelize } from "sequelize";
import { IItem, IUser } from "./models_type";

const sequelize = new Sequelize({
  username: "postgres",
  password: "2562",
  database: "tech_shop",
  host: "127.0.0.1",
  dialect: "postgres",
});

export const User = sequelize.define<IUser>(
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
  },
  {
    timestamps: false,
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

export const Cart = sequelize.define(
  "cart",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
  },
  {
    timestamps: false,
  }
);

export const CartItem = sequelize.define(
  "cart_item",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    //quantity
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

export const Type = sequelize.define(
  "type",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    },
  },
  {
    timestamps: false,
  }
);

export const Brand = sequelize.define(
  "brand",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
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

// name: { value: string };
// category: { value: string };
// price: { value: number };
// image0: { files: FileList };
// image1: { files: FileList };
// image2: { files: FileList };
// image3: { files: FileList };
// image4: { files: FileList };
// image5: { files: FileList };
// image6: { files: FileList };
// image7: { files: FileList };
// description: { value: string };
// location: { value: string };

export const Item = sequelize.define<IItem>(
  "item",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    image: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

User.hasOne(Cart, { foreignKey: "user_id", onDelete: "CASCADE" });
Cart.belongsTo(User, { foreignKey: "user_id", onDelete: "CASCADE" });

User.hasMany(Rating, { foreignKey: "rating_id" });
Rating.belongsTo(User, { foreignKey: "rating_id" });

Cart.belongsToMany(Item, { through: CartItem, foreignKey: "cart_id" });
Item.belongsToMany(Cart, { through: CartItem, foreignKey: "item_id" });

Type.hasMany(Item, { foreignKey: "type_id" });
Item.belongsTo(Type, { foreignKey: "type_id" });

Brand.hasMany(Item, { foreignKey: "brand_id" });
Item.belongsTo(Brand, { foreignKey: "brand_id" });

Item.hasMany(Rating, { foreignKey: "rating_id" });
Rating.belongsTo(Item, { foreignKey: "rating_id" });

export default sequelize;

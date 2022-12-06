import {
  BelongsToManyAddAssociationMixin,
  BelongsToManyGetAssociationsMixin,
  BelongsToManyRemoveAssociationMixin,
  BelongsToManySetAssociationsMixin,
  DataType,
  Model,
} from "sequelize";

export interface IUser extends Model {
  id: string;
  name: string;
  email: string;
  password: string;
  image: string | null;
  role: string;
  activationLink: string | null;
  isActivated: boolean | null;
  email_verified: DataType | null;
  getItems: BelongsToManyGetAssociationsMixin<IItem | IItem[]>;
  getFavorite: BelongsToManyGetAssociationsMixin<IItem | IItem[]>;
  addFavorite: BelongsToManyAddAssociationMixin<IItem, string>;
  setFavorite: BelongsToManySetAssociationsMixin<void, void>;
  removeFavorite: BelongsToManyRemoveAssociationMixin<IItem, string>;
}

export interface IItem extends Model {
  id: string;
  name: string;
  price: number;
  images: string[];
  description: string;
  user_id: string;
  category_id: string;
  location: string;
  phone_number: number | null;
}

export interface ICategory extends Model {
  id: string;
  name: string;
}

import {
  BelongsToManyAddAssociationMixin,
  BelongsToManyGetAssociationsMixin,
  BelongsToManyRemoveAssociationMixin,
  BelongsToManySetAssociationsMixin,
  Model,
} from "sequelize";

export interface IUser {
  id: string;
  name: string;
  email: string;
  password: string | null;
  image: string | null;
  role: string;
  activationLink: string | null;
  isActivated: boolean | null;
  email_verified: string | null;
  createdAt: string;
}

export interface IUserModel extends IUser, Model {
  getItems: BelongsToManyGetAssociationsMixin<IItem>;
  getFavorite: BelongsToManyGetAssociationsMixin<IItem>;
  addFavorite: BelongsToManyAddAssociationMixin<IItem, string>;
  setFavorite: BelongsToManySetAssociationsMixin<void, void>;
  removeFavorite: BelongsToManyRemoveAssociationMixin<IItem, string>;
}

export interface IItem {
  id: string;
  name: string;
  price: string;
  images: string[];
  description: string;
  location: string;
  phone_number: string | null;
  createdAt: string;
  user_id: string;
  category_id: string;
}

export interface IItemModel extends Model, IItem {}

export interface IItemWithUser extends IItem {
  user: IUser;
}

export interface IItemWithCategory extends IItem {
  category: ICategory;
}

export interface ICategory {
  id: string;
  name: string;
}

export interface ICategoryModel extends Model, ICategory {}

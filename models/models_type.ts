import {
  BelongsToManyAddAssociationMixin,
  BelongsToManyGetAssociationsMixin,
  BelongsToManyRemoveAssociationMixin,
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
  getFavorite: BelongsToManyGetAssociationsMixin<IItem>;
  addFavorite: BelongsToManyAddAssociationMixin<IItem, string>;
  removeFavorite: BelongsToManyRemoveAssociationMixin<IItem, string>;
}

export interface IItem extends Model {
  id: string;
  name: string;
  price: number;
  images: string[];
  description: string;
  location: string;
  user_id: string;
  category_id: string;
}

export interface ICategory extends Model {
  id: string;
  name: string;
}

import { Model } from "sequelize";

export interface IUser extends Model {
  id: string;
  name: string;
  email: string;
  password: string;
  image: string | null;
  email_verified: boolean | null;
}

export interface IItem extends Model {
  id: string;
  name: string;
  price: number;
  image: string;
}

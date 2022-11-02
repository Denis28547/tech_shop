import { DataType, Model } from "sequelize";

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
}

export interface IItem extends Model {
  id: string;
  name: string;
  category: string;
  price: number;
  images: string[];
  description: string;
  location: string;
}

export interface IUser {
  id: string;
  name: string;
  email: string;
  password: string;
  image: string | null;
  role: string;
  activationLink: string | null;
  isActivated: boolean | null;
  email_verified: string | null;
  createdAt: string;
}

export interface IItem {
  id: string;
  name: string;
  category: {
    id: string;
    name: string;
  };
  price: number;
  images: string[];
  description: string;
  location: string;
  user_id: string;
  phone_number: string | null;
  category_id: string;
  createdAt: string;
}

export interface IItemWithUser extends IItem {
  user: IUser;
}

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
}

export interface IItem {
  id: string;
  name: string;
  price: number;
  images: string[];
  description: string;
  location: string;
  user_id: string;
  category_id: string;
  createdAt: string;
}

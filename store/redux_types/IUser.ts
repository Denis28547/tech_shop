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

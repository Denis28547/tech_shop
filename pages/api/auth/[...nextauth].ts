import NextAuth, { DefaultSession } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import CredentialProvider from "next-auth/providers/credentials";
import axios, { AxiosError } from "axios";
import SequelizeAdapter from "@next-auth/sequelize-adapter";
import sequelize, { Cart } from "../../../models";

sequelize.sync();

export const authOptions = {
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60,
  },

  adapter: SequelizeAdapter(sequelize),

  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }), //! ADD GOOGLE PROVIDER

    CredentialProvider({
      name: "credentials",
      credentials: {
        email: {
          label: "email",
          type: "email",
          placeholder: "email@example.com",
        },
        password: { label: "password", type: "text" },
      },
      authorize: async (credentials) => {
        try {
          const res = await axios.post(
            "http://localhost:3000/api/signin",
            credentials
          );

          const user = res.data;

          if (res.status === 200) {
            return user;
          }
        } catch (error: any) {
          throw new Error(error.response?.data?.message);
        }
      },
    }),
  ],

  events: {
    //@ts-ignore
    async createUser({ user }) {
      const user_id = user?.id;
      await Cart.create({ user_id });
    },
  },

  pages: {
    signIn: "/",
    error: "/",
  },
};

//@ts-ignore
export default NextAuth(authOptions);

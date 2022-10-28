import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialProvider from "next-auth/providers/credentials";
import axios from "axios";
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
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),

    CredentialProvider({
      name: "credentials",
      credentials: {},
      authorize: async (credentials) => {
        try {
          const res = await axios.post(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/signin`,
            credentials
          );

          if (res.status === 200) {
            return res.data;
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
    signIn: "/oautherror",
    error: "/oautherror",
  },
};

//@ts-ignore
export default NextAuth(authOptions);

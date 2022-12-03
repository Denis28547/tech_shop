import NextAuth, { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialProvider from "next-auth/providers/credentials";
import axios from "axios";
import SequelizeAdapter from "@next-auth/sequelize-adapter";
import sequelize, { User } from "../../../models";
import { IUser } from "../../../models/models_type";

sequelize.sync();

export const authOptions: NextAuthOptions = {
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

  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60,
  },

  callbacks: {
    session: async ({
      session,
      token,
      user,
    }: {
      session: any;
      token: any;
      user: any;
    }) => {
      if (session?.user) {
        session.user.id = token.sub;
      }
      return session;
    },
  },

  pages: {
    signIn: "/oautherror",
    error: "/oautherror",
  },

  events: {
    createUser: async ({ user }) => {
      const date = new Date();
      await User.update(
        { createdAt: date },
        {
          where: {
            id: user.id,
          },
        }
      );
    },
  },
};

// @ts-ignore
export default NextAuth(authOptions);

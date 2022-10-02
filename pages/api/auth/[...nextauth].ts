import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import CredentialProvider from "next-auth/providers/credentials";
import axios from "axios";
import SequelizeAdapter from "@next-auth/sequelize-adapter";
import sequelize from "../../../models";

sequelize.sync();

export const authOptions = {
  adapter: SequelizeAdapter(sequelize),

  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),

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
        const res = await axios.post(
          "http://localhost:3000/api/signin",
          credentials
        );

        console.log(credentials);

        const user = res.data;

        if (res.data.status === 400) {
          console.log(res.data);
          return null;
        }

        if (res.status === 200) {
          return user;
        }
      },
    }),
  ],
  // adapter: SequelizeAdapter(sequelize),
  session: {
    strategy: "jwt",
    maxAge: 1 * 24 * 60 * 60,
  },
};
//@ts-ignore

export default NextAuth(authOptions);

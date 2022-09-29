import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import CredentialProvider from "next-auth/providers/credentials";
import axios from "axios";

// interface ServerPostResponse {

// }

export const authOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      // clientId: process.env.GITHUB_ID!,
      // clientSecret: process.env.GITHUB_SECRET!,
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
};
export default NextAuth(authOptions);

/* https://www.youtube.com/watch?v=im8o328q6EI */

import NextAuth from "next-auth";
import CredentialProvider from "next-auth/providers/credentials";

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    CredentialProvider({
      name: "credentials",
      credentials: {
        username: { label: "Email", type: "email", placeholder: "..." },
        password: { label: "Password", type: "password" },
      },
      authorize: (credentials) => {
        //database look up
        if (
          credentials.username === "john" &&
          credentials.password === "test"
        ) {
          return {
            id: 2,
            name: "John",
            email: "john@test.com",
          };
        }
        //login failed
        return null;
      },
    }),
  ],

  callbacks: {
    jwt: async () => {},
    session: () => {},
  },

  pages: {
    signIn: "/auth/signin",
  },
});

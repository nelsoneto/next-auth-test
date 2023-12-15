import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const nextAuthOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        cnpj: { label: "cnpj", type: "text" },
        matricula: { label: "matricula", type: "number" },
        password: { label: "password", type: "password" },
      },

      async authorize(credentials, req) {
        const response = await fetch(
          "https://testemobile.smartinform.com.br/public/login",
          {
            method: "POST",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify({
              cnpj: credentials?.cnpj,
              matricula: credentials?.matricula,
              password: credentials?.password,
            }),
          }
        );

        const user = await response.json();

        if (user && response.ok) {
          return user;
        } else {
          throw new Error("Falha na autenticação dos dados!");
        }
      },
    }),
  ],
  pages: {
    signIn: "/",
  },
  callbacks: {
    async jwt({ token, user }) {
      user && (token.user = user);
      return token;
    },
    async session({ session, token }) {
      session = token.user as any;
      return session;
    },
  },
};

const handler = NextAuth(nextAuthOptions);

export { handler as GET, handler as POST, nextAuthOptions };

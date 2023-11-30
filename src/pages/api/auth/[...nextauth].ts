import { TLogin } from '@/types/types';
import { ROUTE } from '@/utils/routes';
import axios, { AxiosResponse } from 'axios';
import NextAuth, { type AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions: AuthOptions = {
  session: {
    strategy: 'jwt',
    maxAge: 3 * 24 * 60 * 60,
  },
  providers: [
    CredentialsProvider({
      type: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email', required: true },
        password: { label: 'Password', type: 'password', required: true },
      },
      async authorize(credentials) {
        const { email, password } = credentials || {};
        if (!email || !password) {
          return null;
        }

        const loginData = await axios
          .post(
            `${process.env.NEXT_PUBLIC_DATABASE_URL}/auth/login`,
            credentials
          )
          .then((resp: AxiosResponse<TLogin>) => resp.data);

        return {
          id: loginData.id,
          email: loginData.email,
          firstName: loginData.firstName,
          token: loginData.token,
          userBackground: loginData.userBackground,
          lastName: loginData.lastName,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ account, token, user }) {
      if (account) {
        token.name = user.firstName;
      }
      if (user) {
        token.token = user.token;
        token.id = user.id;
        token.email = user.email;
        token.firstName = user.firstName;
        token.userBackground = user.userBackground;
        token.lastName = user.lastName;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.token = token.token;
        // @ts-ignore
        session.user.email = token.email;
        session.user.firstName = token.firstName;
        session.user.id = token.id;
        session.user.userBackground = token.userBackground;
        session.user.lastName = token.lastName;
      }
      return session;
    },
  },
  pages: {
    signIn: ROUTE.HOME,
  },
};

export default NextAuth(authOptions);

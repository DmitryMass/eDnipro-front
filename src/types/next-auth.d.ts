import NextAuth, { DefaultSession, User, AuthOptions } from 'next-auth';
import { JWT, DefaultJWT } from 'next-auth/jwt';
import { TLogin } from './types';

declare module 'next-auth' {
  interface Session {
    user: TLogin;
  }

  interface User extends TLogin {}
}

declare module 'next-auth/jwt' {
  interface JWT extends TLogin {}
}

import { AuthOptions } from 'next-auth';
import DiscordProvider from 'next-auth/providers/discord';
import { PrismaClient } from '@prisma/client';
import { PrismaAdapter } from '@auth/prisma-adapter';
const prisma = new PrismaClient();

const options: AuthOptions = {
  // Configure one or more authentication providers

  providers: [
    DiscordProvider({
      clientId: String(process.env.DISCORD_CLIENT_ID),
      clientSecret: String(process.env.DISCORD_CLIENT_SECRET),
    }),
    // ...add more providers here
  ],

  callbacks: {
    //first it run the jwt function, the jwt function will return the token , then in the session function we can access the token
    async jwt({ token, user }) {
      //user is from the oauth config or in the credentials setting options
      console.log('user in server');
      console.log(user);
      if (user) return { ...token, ...user };
      console.log('jwt in server');
      console.log(token);
      return token; //this will be used in session function
    },
    async session({ token, session }) {
      console.log('session in server');
      console.log(session);
      console.log(token);
      return session;
    },
  },
  pages: {
    signIn: '/auth/login',
  },
};
export default options;

/*
import NextAuth from "next-auth"

declare module "next-auth" {
  
   // Étendre l'interface User
   
  interface User {
    id: string
    name: string
    email: string
    image?: string | null
  }

  
  // Étendre l'interface Session
  
  interface Session {
    user: {
      id: string
      name: string
      email: string
      image?: string | null
    }
  }
}

declare module "next-auth/jwt" {
  // Étendre l'interface JWT
  interface JWT {
    id: string
  }
}
*/



import NextAuth from 'next-auth';
import { authOptions } from '@/lib/auth';

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };


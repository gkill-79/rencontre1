import NextAuth from "next-auth"

declare module "next-auth" {
  /**
   * Étendre l'interface User
   */
  interface User {
    id: string
    name: string
    email: string
    image?: string | null
  }

  /**
   * Étendre l'interface Session
   */
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
  /** Étendre l'interface JWT */
  interface JWT {
    id: string
  }
}
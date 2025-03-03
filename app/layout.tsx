// baiserapide/app/layout.tsx
// app/layout.tsx
import { Inter } from "next/font/google";
import { SessionProvider } from "next-auth/react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth"; // Vous devrez créer ce fichier si vous ne l'avez pas déjà

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);
  
  return (
    <html lang="fr">
      <body className={`${inter.variable} antialiased dark:bg-gray-900 dark:text-white`}>
        <SessionProvider session={session}>
          {children}
        </SessionProvider>
      </body>
    </html>
  );
};



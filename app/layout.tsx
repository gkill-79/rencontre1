// baiserapide/app/layout.tsx
// app/layout.tsx
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr"> {/* ✅ Langue mise en français */}
      <body className={`${inter.variable} antialiased dark:bg-gray-900 dark:text-white`}>
        {children}
      </body>
    </html>
  );
}


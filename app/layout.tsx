import React from 'react';
import { Providers } from './providers';
import HeaderClient from '@/components/client/HeaderClient';
import '../styles/globals.css'; // Import des styles Tailwind

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className="min-h-screen bg-gray-50">
        <Providers>
          <HeaderClient />
          <main className="container mx-auto px-4 py-8">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
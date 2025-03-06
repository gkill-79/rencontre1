import React from 'react';
import { Providers } from './providers';
import HeaderClient from '@/components/client/HeaderClient';

export default function RootLayout({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <HeaderClient />
          {children}
        </Providers>
      </body>
    </html>
  );
}